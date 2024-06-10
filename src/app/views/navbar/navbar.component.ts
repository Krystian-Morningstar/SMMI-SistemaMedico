import { Component, OnInit, HostListener } from '@angular/core';
import { SistemaService } from './../../services/sistema.service';
import { Router } from '@angular/router';
import { IngresosPorEspecialidadService } from 'src/app/services/habitacionfiltrada.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  mostrar: boolean = false;
  buscar: string = '';
  especialidadIds: number[] = [];

  constructor(private servicio: SistemaService, private router: Router, private habitacionesService: IngresosPorEspecialidadService) {}

  ngOnInit(): void {
    this.mostrar = false;
    this.cargarEspecialidades();
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.mostrar) {
      this.mostrar = false;
      this.servicio.Actualizar_Menu(false);
    }
  }

  mostrarMenu(event: Event) {
    event.stopPropagation();
    this.mostrar = !this.mostrar;
    this.servicio.Actualizar_Menu(this.mostrar);
  }

  actualizarBuscar(event: Event): void {
    this.buscar = (event.target as HTMLInputElement).value;
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscarHabitacion(this.buscar);
    }
  }

  cargarEspecialidades() {
    const especialidadString = localStorage.getItem('especialidad');
    if (especialidadString) {
      const especialidades = JSON.parse(especialidadString);
      this.especialidadIds = especialidades.map((especialidad: any) => especialidad.id);
    }
  }

  async buscarHabitacion(nombre: string) {
    if (this.especialidadIds.length > 0) {
      let todasHabitaciones: any[] = [];
      for (let id of this.especialidadIds) {
        const habitaciones = await this.habitacionesService.buscarPaciente(nombre, id).toPromise();
        todasHabitaciones = todasHabitaciones.concat(habitaciones);
      }
      if (todasHabitaciones.length > 0) {
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['busqueda'], { queryParams: { nombre: nombre, especialidad: this.especialidadIds.join(',') } });
        });
      } else {
        alert('No se encontró la habitación');
      }
    } else {
      alert('No hay especialidades disponibles');
    }
  }
}
