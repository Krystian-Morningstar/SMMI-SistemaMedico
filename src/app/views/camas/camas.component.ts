import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitacionesService } from '../../services/habitaciones.service';
import { MedicoService } from '../../services/doctor.service';
import { Medico } from '../../models/medico.models';
import { IngresosPorEspecialidadService } from '../../services/habitacionfiltrada.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-camas',
  templateUrl: './camas.component.html',
  styleUrls: ['./camas.component.css'],
})
export class CamasComponent implements OnInit {
  habitaciones: any[] = [];
  matricula: string = '';
  especialidadId: any[] = [];
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
    matriculaMedico: '',
  };

  constructor(
    private habitacionesService: HabitacionesService,
    private habitacionfiltrada: IngresosPorEspecialidadService,
    private medicoService: MedicoService,
    private router: Router,
    private recetaservice: RecetaService
  ) {
    this.matricula = localStorage.getItem('matricula') || '';
  }

  async cargar_datos() {
    let a: any = await this.medicoService
      .obtenerMedico(this.matricula)
      .toPromise();

    for (let i = 0; i < a.especialidades.length; i++) {
      this.especialidadId[i] = a.especialidades[i].id;
    }
  }

  async ngOnInit() {
    await this.cargar_datos();
    for (let i = 0; i < this.especialidadId.length; i++) {
      this.habitacionfiltrada
        .obtenerIngresosPorEspecialidad(this.especialidadId[i])
        .subscribe(async (data: any) => {
          const nuevasHabitaciones = await Promise.all(data.map(async (habitacion: any) => {
            const recetas = await this.recetaservice.obtenerreceta(habitacion.id_ingreso).toPromise();
            if (recetas) {
              return {
                habitacion: habitacion,
                tieneRecetas: recetas && recetas.length > 0
              };
            }
            return {
              habitacion: habitacion,
              tieneRecetas: false
            };
          }));
          this.habitaciones = this.habitaciones.concat(nuevasHabitaciones);
          console.log('Habitaciones acumuladas:', this.habitaciones);
        });
    }
  }

  seleccionarHabitacion(habitacion: any) {
    this.router.navigate(['habitacion'], {
      queryParams: {
        id: habitacion.habitacion.id_ingreso,
        matricula: this.matricula,
      },
    });
  }
}
