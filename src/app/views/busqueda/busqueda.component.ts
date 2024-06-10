import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../../services/doctor.service';
import { Medico } from '../../models/medico.models';
import { IngresosPorEspecialidadService } from '../../services/habitacionfiltrada.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  nombre: any;
  habitaciones: any[] = [];
  matricula: string = '';
  especialidadIds: number[] = [];
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
    private habitacionfiltrada: IngresosPorEspecialidadService,
    private medicoService: MedicoService,
    private router: Router,
    private route: ActivatedRoute,
    private recetaservice: RecetaService
  ) {
    this.matricula = localStorage.getItem('matricula') || '';
  }

  async cargar_datos() {
    let a: any = await this.medicoService
      .obtenerMedico(this.matricula)
      .toPromise();

    for (let i = 0; i < a.especialidades.length; i++) {
      this.especialidadIds[i] = a.especialidades[i].id;
    }
  }

  async ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      const especialidades = params['especialidad'];
      if (especialidades) {
        this.especialidadIds = especialidades.split(',').map((id: string) => parseInt(id, 10));
      }
    });
    await this.cargar_datos();

    for (let id of this.especialidadIds) {
      this.habitacionfiltrada.buscarPaciente(this.nombre, id)
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
