import { Component } from '@angular/core';
import { CrearReceta_interface } from '../models/CrearReceta.model';

@Component({
  selector: 'app-incidencias',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {
  title = 'Doctor';
  CrearReceta:  CrearReceta_interface= {
    Nombre: 'nombre',
    Fecha: '12/12/12',
    Medicamentos: 'Medicamentos',
    Indicaciones_adicionales: 'indicaciones'
  }  ;
    
  

  historialIncidencias = [
    {
      horaAlarma: '10:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 1',
      accionesTomadas: 'Acciones 1',
    },
   
  ];

  historialRecetas = [
    {
      fecha: '2024-04-09',
      Hora: '10:00',
      Doctor: 'Doctor',
      Medicamentos: 'Medicamentos',
      Indicacionesadicionales: 'Indicaciones adicionales',
    },
   
  ];
}
