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
  especialidadId:any; // Inicializamos la variable especialidadId con valor 0
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
    console.log(1111)
    // Llamamos al servicio para obtener la especialidad del médico
    let a: any = await this.medicoService.obtenerMedico(this.matricula).toPromise(  );
    console.log(a,"aa")
    this.especialidadId = a.especialidades[0].id

    //recorrer arreglo
    //for(let i = 0; i< a.length; i++){
    //this.informacion_Medico.id= a.id
    //this.informacion_Medico.nombres=a.nombres
    //this.informacion_Medico.apellidos=a.apellidos
    //this.informacion_Medico.direccion=a.direccion
    //this.informacion_Medico.telefono=a.telefono
    //this.informacion_Medico.curp=a.curp
    //this.informacion_Medico.genero=a.genero
    //this.informacion_Medico.cedula=a.cedula
    //this.informacion_Medico.contrasena=a.contrasena
    //console.log(a.especialidades, "222")
    //    for(let j = 0; j< a[i].especialidades.length; j++){
    //this.especialidadId[i] = a[i].especialidades[j].id;
    //}
    
   console.log(this.especialidadId)
  }

  async ngOnInit(){
    await this.cargar_datos();
    console.log("valor prueba:", this.especialidadId    );
    await this.habitacionfiltrada.obtenerIngresosPorEspecialidad(2).subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        habitacion: habitacion,
       
      }));
    });
  }

  seleccionarHabitacion(habitacion: any){
    this.router.navigate(['habitacion'], { queryParams: { id: habitacion.habitacion.id_ingreso, matricula: this.matricula } });
  }



}
