import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { SensorConfigService } from 'src/app/services/sensor-config.service';
import { SensorConfig } from 'src/app/models/sensores.models'; 
import { IngresosPorEspecialidadService } from 'src/app/services/habitacionfiltrada.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './RECETA.component.html',
  styleUrls: ['./RECETA.component.css'],
})
export class RECETAComponent implements OnInit {
  idIngreso: string = '';
  mensaje: string = '';
  fechaActual: string = '';
  medicamentos: string = '';
  indicacionesAdicionales: string = '';
  informacionPaciente: registro_Interface = {
    nombres: '',
    apellidos: '',
    edad: 0,
    sexo: '',
    padecimientos: '',
    alergias: '',
    causa_ingreso: '',
    id_enfermera: '',
    id_especialidad: 0,
    id_habitacion: 0,
  };

  errorMessage: string = '';

  SignosVitales = [
    {
      ritmoCardiaco: 'X',
      presion: 'x',
      temperatura: 'x',
    },
  ];
  oxigenacionMin: number = 0;
  oxigenacionMax: number = 0;
  frecuenciaCardiacaMin: number = 0;
  frecuenciaCardiacaMax: number = 0;
  presionSistolicaMin: number = 0;
  presionSistolicaMax: number = 0;
  presionDiastolicaMin: number = 0;
  presionDiastolicaMax: number = 0;
  temperaturaMin: number = 0;
  temperaturaMax: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacioneService: IngresosPorEspecialidadService,
    private recetaService: RecetaService,
    private sensorConfigService: SensorConfigService,
    private router: Router
  ) {}
  matricula: string = '';

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idIngreso = params['id'];
      this.obtenerFechaActual();
      this.cargarInformacionPaciente();
    });
    this.matricula = localStorage.getItem('matricula') || '';
  }

  cargarInformacionPaciente(): void {
    this.habitacioneService.habitacion(this.idIngreso).subscribe(
      (data: any) => {
        this.informacionPaciente = {
          ...data,
          id_enfermera: `${data.id_enfermera.nombres} ${data.id_enfermera.apellidos}`,
          id_especialidad: data.id_especialidad.nombre,
          id_habitacion: data.id_habitacion.id_habitacion,
        };
        this.obtener_sensores();
      },
      (error) => {
        console.error('Error al cargar la información del paciente:', error);
        this.errorMessage = `Error al cargar la información del paciente: ${error}`;
      }
    );
  }
  obtenerFechaActual() {
    const hoy = new Date();
    this.fechaActual = hoy.toLocaleDateString();
  }

  async crearReceta() {
    const recetaData = {
      matricula_medico: this.matricula,
      id_ingreso: this.idIngreso,
      medicamentos: this.medicamentos,
      indicaciones_addic: this.indicacionesAdicionales,
    };
     console.log(recetaData);
    this.recetaService.crearReceta(recetaData).subscribe(
      () => {
        this.router.navigate(['/habitacion'], {
          queryParams: { id: this.idIngreso },
        });
      },
      (error) => {
        console.error('Error al guardar la receta:', error);
        this.errorMessage = `Error al guardar la receta: ${error}`;
      }
    );
  }

  obtener_sensores() {
    this.sensorConfigService
      .obtenersensores(this.informacionPaciente.id_habitacion)
      .subscribe((data) => {
        for (let i = 0; i < data.length; i++) {
          const sensor = data[i];
          switch (sensor.topico_sensor) {
            case '/oxig':
              this.oxigenacionMin = sensor.min_valor;
              this.oxigenacionMax = sensor.max_valor;
              break;
            case '/freqCard':
              this.frecuenciaCardiacaMin = sensor.min_valor;
              this.frecuenciaCardiacaMax = sensor.max_valor;
              break;
            case '/presArtsist':
              this.presionSistolicaMin = sensor.min_valor;
              this.presionSistolicaMax = sensor.max_valor;
              break;
            case '/presArtdiast':
              this.presionDiastolicaMin = sensor.min_valor;
              this.presionDiastolicaMax = sensor.max_valor;
              break;
            case '/tempCorp':
              this.temperaturaMin = sensor.min_valor;
              this.temperaturaMax = sensor.max_valor;
              break;
            default:
              console.warn(`Tópico no reconocido: ${sensor.topico_sensor}`);
          }
        }
      });
  }

  async guardarConfiguracion() {
    const config = {
      config: [
        {
          max_valor: this.oxigenacionMax,
          min_valor: this.oxigenacionMin,
          topico_sensor: '/oxig',
        },
        {
          max_valor: this.frecuenciaCardiacaMax,
          min_valor: this.frecuenciaCardiacaMin,
          topico_sensor: '/freqCard',
        },
        {
          max_valor: this.presionSistolicaMax,
          min_valor: this.presionSistolicaMin,
          topico_sensor: '/presArtsist',
        },
        {
          max_valor: this.presionDiastolicaMax,
          min_valor: this.presionDiastolicaMin,
          topico_sensor: '/presArtdiast',
        },
        {
          max_valor: this.temperaturaMax,
          min_valor: this.temperaturaMin,
          topico_sensor: '/tempCorp',
        },
      ],
      id_habitacion: this.informacionPaciente.id_habitacion,
    };

    this.sensorConfigService.postSensorConfig(config).subscribe(
      () => {
        this.router.navigate(['/habitacion'], {
          queryParams: { id: this.idIngreso },
        });
      },
      (error) => {
        console.error('Error al guardar los sensores:', error);
        this.errorMessage = `Error al guardar los sensores: ${error}`;
      }
    );
  }

  //borrar
  async enviarConfiguracionesSensores() {
    const config: SensorConfig[] = [
      {
        max_valor: this.oxigenacionMax,
        min_valor: this.oxigenacionMin,
        topico_sensor: '/oxig',
      },
      {
        max_valor: this.frecuenciaCardiacaMax,
        min_valor: this.frecuenciaCardiacaMin,
        topico_sensor: '/freqCard',
      },
      {
        max_valor: this.presionSistolicaMax,
        min_valor: this.presionSistolicaMin,
        topico_sensor: '/presArtsist',
      },
      {
        max_valor: this.presionDiastolicaMax,
        min_valor: this.presionDiastolicaMin,
        topico_sensor: '/presArtdiast',
      },
      {
        max_valor: this.temperaturaMax,
        min_valor: this.temperaturaMin,
        topico_sensor: '/tempCorp',
      },
    ];
  }
}
