import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Receta_interface } from 'src/app/models/Receta.model';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';
import { ActivatedRoute, } from '@angular/router';import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { registro_Interface } from 'src/app/models/registro.model';


@Component({
  selector: 'app-incidencias',
  templateUrl: './RECETA.component.html',
  styleUrls: ['./RECETA.component.css']
})

export class RECETAComponent {
  constructor(private activatedRoute: ActivatedRoute, private habitacioneService: HabitacionesService,private router: Router) {}
  idIngreso: any
  mensaje: string = '';
  fechaActual: string = '';
  
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.idIngreso= params['id'];
      this.obtenerFechaActual();
    });
  
    this.habitacioneService.habitacion(this.idIngreso).subscribe((data: any) => {
      this.informacionPaciente.nombres = data.nombres;
      this.informacionPaciente.apellidos = data.apellidos;
      this.informacionPaciente.edad = data.edad;
      this.informacionPaciente.sexo = data.sexo;
      this.informacionPaciente.padecimientos = data.padecimientos;
      this.informacionPaciente.alergias = data.alergias;
      this.informacionPaciente.causa_ingreso = data.causa_ingreso;
      this.informacionPaciente.id_enfermera = data.id_enfermera.nombres + ' ' + data.id_enfermera.apellidos;
      this.informacionPaciente.id_especialidad = data.id_especialidad.nombre;
      this.informacionPaciente.id_habitacion = data.id_habitacion.id_habitacion;
    });
  }
  
     Receta(){
        this.router.navigate(['/receta']);
      }
  
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
      id_habitacion:0,
    };
  
  
    historialIncidencias = [
      {
        horaAlarma: '10:00',
        fecha: '2024-04-09',
        eventoCritico: 'Evento 1',
        accionesTomadas: 'Acciones 1',
      },
      {
        horaAlarma: '11:00',
        fecha: '2024-04-09',
        eventoCritico: 'Evento 2',
        accionesTomadas: 'Acciones 2',
      },
      {
        horaAlarma: '11:00',
        fecha: '2024-04-09',
        eventoCritico: 'Evento 2',
        accionesTomadas: 'Acciones 2',
      },
      {
        horaAlarma: '11:00',
        fecha: '2024-04-09',
        eventoCritico: 'Evento 2',
        accionesTomadas: 'Acciones 2',
      },
    ];
    SignosVitales = [
      {
        ritmoCardiaco: 'X',
        presion: 'x',
        temperatura: 'x',
      },
    ];
  

    guardarYVolver(): void {
      // Aquí puedes agregar la lógica para guardar la receta
  
      // Después de guardar, navegar a la página de la habitación
      this.router.navigate(['/habitacion']);
    }
    obtenerFechaActual() {
      const hoy = new Date();
      this.fechaActual = hoy.toLocaleDateString();
    }
    navegarAhistorial() {
      this.router.navigate(['/habitacion'], { queryParams: { id: this.idIngreso } });
    }
}