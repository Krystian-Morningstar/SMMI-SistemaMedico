import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { HabitacionesService } from 'src/app/services/habitaciones.service';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacioneService: HabitacionesService,
    private recetaService: RecetaService,
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

  navegarAhistorial() {
    const recetaData = {
      matricula_medico: 'M88345M',
      id_ingreso: this.idIngreso,
      medicamentos: this.medicamentos,
      indicaciones_addic: this.indicacionesAdicionales,
    };

    this.recetaService.crearReceta(recetaData).subscribe(() => {
      this.router.navigate(['/habitacion'], { queryParams: { id: this.idIngreso } });
    }, error => {
      console.error('Error al guardar la receta:', error);
      this.errorMessage = `Error al guardar la receta: ${error}`;
    });
  }
}
