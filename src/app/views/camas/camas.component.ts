import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from '../../services/habitaciones.service';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css']
})
export class CamasComponent {
    habitaciones: any[] = []; 

  constructor(private habitacionesService: HabitacionesService, private router: Router) {}

  async ngOnInit(){
    await this.habitacionesService.habitaciones().subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        habitacion: habitacion
      }));
    });
  }

  seleccionarHabitacion(habitacion: any){
    this.router.navigate(['habitacion'], { queryParams: { id: habitacion.habitacion.id_ingreso } });
  }
}