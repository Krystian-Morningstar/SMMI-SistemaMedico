import { Component } from '@angular/core';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';
import { ActivatedRoute, Router } from '@angular/router';
import { registro_Interface } from 'src/app/models/registro.model';
import { RecetaService } from 'src/app/services/receta.service';
import { AlertasReportesService } from 'src/app/services/alertas-reportes.service';
import { IngresosPorEspecialidadService } from 'src/app/services/habitacionfiltrada.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent {
  historial: any[] = [];
  Incidencias: any[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private habitacioneService: IngresosPorEspecialidadService,
    private router: Router,
    private recetaservice: RecetaService,
    private incidencias: AlertasReportesService
  ) {}
  idIngreso: any;
  mensaje: string = '';

  async ngOnInit(): Promise<void> {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.idIngreso = params['id'];
    });
    await this.recetaservice
      .obtenerreceta(this.idIngreso)
      .subscribe((data: any) => {
        this.historial = data;
      });
    await this.incidencias
      .getAlertasReportes(this.idIngreso)
      .subscribe((data: any) => {
        this.Incidencias = data;
      });

    this.habitacioneService
      .habitacion(this.idIngreso)
      .subscribe((data: any) => {
        this.informacionPaciente.nombres = data.nombres;
        this.informacionPaciente.apellidos = data.apellidos;
        this.informacionPaciente.edad = data.edad;
        this.informacionPaciente.sexo = data.sexo;
        this.informacionPaciente.padecimientos = data.padecimientos;
        this.informacionPaciente.alergias = data.alergias;
        this.informacionPaciente.causa_ingreso = data.causa_ingreso;
        this.informacionPaciente.id_enfermera =
          data.id_enfermera.nombres + ' ' + data.id_enfermera.apellidos;
        this.informacionPaciente.id_especialidad = data.id_especialidad.nombre;
        this.informacionPaciente.id_habitacion = data.id_habitacion.id_habitacion;
      });
  }

  Receta() {
    this.router.navigate(['/receta'], { queryParams: { id: this.idIngreso } });
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
    id_habitacion: 0,
  };

  historialIncidencias = [];

  historialRecetas = [];
}
