import { Component } from '@angular/core';
import { Receta_interface } from '../models/Receta.model';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.component.html',
  styleUrls: ['./incidencias.component.css']
})
export class IncidenciasComponent {
  title = 'Doctor';
    Receta: Receta_interface = {
      Nombre: 'nombre',
      Fecha: 'Fecha', 
      Medicamentos: 'Medicacmentos',
      Indicaciones_adicionales: 'indicaciones',
    }
    
  

  historialIncidencias = [
    {
      horaAlarma: '10:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 1',
      accionesTomadas: 'Acciones 1',
    },
   
  ];
}
