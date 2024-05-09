import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  habitaciones: any[] = []; 
  private mqttSubscription: Subscription | undefined;

  constructor(private habitacionesService: HabitacionesService, private router: Router) {}

  async ngOnInit(){
    await this.habitacionesService.habitaciones().subscribe((data: any) => {
      this.habitaciones = data.map((habitacion: any) => ({
        habitacion: habitacion,
        temperatura: 'Sin datos',
      }));
    });
  }

  seleccionarHabitacion(habitacion: any){
    this.router.navigate(['habitacion'], { queryParams: { id: habitacion.habitacion.id_ingreso } });
  }
  

}
