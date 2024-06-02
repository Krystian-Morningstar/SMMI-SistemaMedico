import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from '../../services/habitaciones.service';
import { MedicoService } from '../../services/doctor.service';
import { Medico} from '../../models/medico.models';
import { IngresosPorEspecialidadService } from '../../services/habitacionfiltrada.service';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css']
})
export class CamasComponent {
  habitaciones: any[] = []; 
  matricula: string = ''; // Variable para almacenar la matrícula del doctor
  especialidadId:any[] =[]; // Inicializamos la variable especialidadId con valor 0
  informacion_Medico: Medico = {
    id: '',
    nombres: '',
    apellidos: '',
    direccion: '',
    telefono: '',
    curp: '',
    genero: '',
    url_img: '',
    cedula: '',
    contrasena: '',
    especialidades: [],
    matriculaMedico: ''
  };
  constructor(
    private habitacionesService: HabitacionesService,
    private habitacionfiltrada: IngresosPorEspecialidadService,
    private medicoService: MedicoService,
    private router: Router
  ) {
    this.matricula = localStorage.getItem('matricula') || '';

  }

  async cargar_datos(){
    let a: any = await this.medicoService.obtenerMedico(this.matricula).toPromise(  );
    
    for(let i = 0; i< a.especialidades.length; i++){
    this.especialidadId[i] = a.especialidades[i].id
    }


    
 
  }

  async ngOnInit(){
    await this.cargar_datos();
    for(let i = 0; i< this.especialidadId.length; i++){
    await this.habitacionfiltrada.obtenerIngresosPorEspecialidad( this.especialidadId[i]).subscribe((data: any) => {
      const nuevasHabitaciones = data.map((habitacion: any) => ({
        habitacion: habitacion,
       
      }));
      this.habitaciones = this.habitaciones.concat(nuevasHabitaciones);
      console.log("Habitaciones acumuladas:", this.habitaciones);
    });
  }
  }

  seleccionarHabitacion(habitacion: any){
    this.router.navigate(['habitacion'], { queryParams: { id: habitacion.habitacion.id_ingreso, matricula: this.matricula } });
  }



}
