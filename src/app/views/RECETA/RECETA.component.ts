import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { SensorConfigService } from 'src/app/services/sensor-config.service'; // Importa el servicio de configuraciones de sensores
import { SensorConfig } from 'src/app/models/sensores.models'; // Importa el modelo de configuraciones de sensores

@Component({
  selector: 'app-incidencias',
  templateUrl: './RECETA.component.html',
  styleUrls: ['./RECETA.component.css']
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
  oxigenacionMin: number =80;
  oxigenacionMax: number=80;
  frecuenciaCardiacaMin: number=80;
  frecuenciaCardiacaMax: number=80;
  presionSistolicaMin: number=80;
  presionSistolicaMax: number=80;
  presionDiastolicaMin: number=80;
  presionDiastolicaMax: number=80;
  temperaturaMin: number=80;
  temperaturaMax: number=80;

  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacioneService: HabitacionesService,
    private recetaService: RecetaService,
    private sensorConfigService: SensorConfigService, // Inyecta el servicio de configuraciones de sensores
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idIngreso = params['id'];
      this.obtenerFechaActual();
      this.cargarInformacionPaciente();
    });
  }

  cargarInformacionPaciente(): void {
    this.habitacioneService.habitacion(this.idIngreso).subscribe((data: any) => {
      this.informacionPaciente = {
        ...data,
        id_enfermera: `${data.id_enfermera.nombres} ${data.id_enfermera.apellidos}`,
        id_especialidad: data.id_especialidad.nombre,
        id_habitacion: data.id_habitacion.id_habitacion
      };
    }, error => {
      console.error('Error al cargar la información del paciente:', error);
      this.errorMessage = `Error al cargar la información del paciente: ${error}`;
    });
  }

  obtenerFechaActual() {
    const hoy = new Date();
    this.fechaActual = hoy.toLocaleDateString();
  }

  async navegarAhistorial() {
    const recetaData = {
      matricula_medico: 'M98765C',
      id_ingreso: this.idIngreso,
      medicamentos: this.medicamentos,
      indicaciones_addic: this.indicacionesAdicionales,
    };
    console.log("INICIO")
    await this.enviarConfiguracionesSensores()
    console.log("FIN");
    
    this.recetaService.crearReceta(recetaData).subscribe(() => {
      this.router.navigate(['/habitacion'], { queryParams: { id: this.idIngreso } });
    }, error => {
      console.error('Error al guardar la receta:', error);
      this.errorMessage = `Error al guardar la receta: ${error}`;
    });
    
  }

  async navegarAhistorial2() {
    const config={"config":[

      {
        "max_valor": this.oxigenacionMax,
        "min_valor": this.oxigenacionMin,
        "topico_sensor": "/oxig"
      },
      {
        "max_valor": this.frecuenciaCardiacaMax,
        "min_valor":this.frecuenciaCardiacaMin,
        "topico_sensor": "/freqCard"
      },
      {
        "max_valor": this.presionSistolicaMax,
        "min_valor": this.presionSistolicaMin,
        "topico_sensor": "/presArtsist"
      },
      {
        "max_valor": this.presionDiastolicaMax,
        "min_valor": this.presionDiastolicaMin,
        "topico_sensor": "/presArtdiast"
      },
      {
        "max_valor": this.temperaturaMax,
        "min_valor": this.temperaturaMin,
        "topico_sensor": "/tempCorp"
      }
    ],
    "id_habitacion": 1
  
  
  } /*SensorConfig[] = {
    config: [
      {
        max_valor: this.oxigenacionMax,
        min_valor: this.oxigenacionMin,
        topico_sensor: "/oxig"
      },
      {
        max_valor: this.frecuenciaCardiacaMax,
        min_valor: this.frecuenciaCardiacaMin,
        topico_sensor: "/freqCard"
      },
      {
        max_valor: this.presionSistolicaMax,
        min_valor: this.presionSistolicaMin,
        topico_sensor: "/presArtsist"
      },
      {
        max_valor: this.presionDiastolicaMax,
        min_valor: this.presionDiastolicaMin,
        topico_sensor: "/presArtdiast"
      },
      {
        max_valor: this.temperaturaMax,
        min_valor: this.temperaturaMin,
        topico_sensor: "/tempCorp"
      }
    ]
  }*/
  
    this.sensorConfigService.postSensorConfig(config).subscribe(() => {
      this.router.navigate(['/habitacion'], { queryParams: { id: this.idIngreso } });
    }, error => {
      console.error('Error al guardar los sensores:', error);
      this.errorMessage = `Error al guardar los sensores: ${error}`;
    });
    
  }

   async enviarConfiguracionesSensores() {
    console.log("enviarconfiguracionessensores")
    const config: SensorConfig[] = [
      {
        max_valor: this.oxigenacionMax,
        min_valor: this.oxigenacionMin,
        topico_sensor: "/oxig"
      },
      {
        max_valor: this.frecuenciaCardiacaMax,
        min_valor: this.frecuenciaCardiacaMin,
        topico_sensor: "/freqCard"
      },
      {
        max_valor: this.presionSistolicaMax,
        min_valor: this.presionSistolicaMin,
        topico_sensor: "/presArtsist"
      },
      {
        max_valor: this.presionDiastolicaMax,
        min_valor: this.presionDiastolicaMin,
        topico_sensor: "/presArtdiast"
      },
      {
        max_valor: this.temperaturaMax,
        min_valor: this.temperaturaMin,
        topico_sensor: "/tempCorp"
      }
    ];
    console.log(config)
     /*let response= await this.sensorConfigService.postSensorConfig(config)
     console.log("RESPUESTA",response.data)/*.subscribe(
      (response) => {
        console.log('psot');
        console.log('Las configuraciones de los sensores se han enviado correctamente:');
        // Manejar la respuesta del servidor si es necesario
      },
      (error) => {
        console.error('Error al enviar las configuraciones de los sensores:');
        // Manejar el error adecuadamente
      }
    );*/
  }
}
