import { Component } from '@angular/core';
import { Receta_interface} from '../models/Receta.model';
import { infoPaciente_interface} from '../models/infoPaciente.model';

@Component({
  selector: 'app-incidencias',
  templateUrl: './RECETA.component.html',
  styleUrls: ['./RECETA.component.css']
})
export class RECETAComponent {
  title = 'Doctor';
  Receta: Receta_interface = {
    Nombre: 'nombre',
    Fecha: 'fecha',
    Medicamentos: '',
  Indicaciones_adicionales: '',
  
  };
    
  

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

  SignosVitales = [
    {
      ritmoCardiaco: 'X',
      presion: 'x',
      temperatura: 'x',
    },
   
  ];

    informacionPaciente =[
      {
      nombre: 'nombre',
      edad: 'edad',
      sexo: 'sexo',
      padecimientos: 'padecimientos',
      alergias: 'alergias',
      causaIngreso: 'causaIngreso',
      enfermera: 'enfermera',
      especialidad: 'especialidad',
    },
  ]
}
