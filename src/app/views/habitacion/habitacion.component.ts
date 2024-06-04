import { Component, OnDestroy, ViewChild } from '@angular/core';
import { historialIncidencias_interface } from 'src/app/models/historialIncidencias.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitacionesService } from 'src/app/services/habitaciones.service';
import { registro_Interface } from 'src/app/models/registro.model';
import { RecetaService } from 'src/app/services/receta.service';
import { AlertasReportesService } from 'src/app/services/alertas-reportes.service';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { StadisticsService } from 'src/app/services/stadistics.service';
import { Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css'],
})
export class HabitacionComponent implements OnDestroy {
  @ViewChild("oxig") oxigChart!: ChartComponent;
  @ViewChild("freqCard") freqCardChart!: ChartComponent;
  @ViewChild("presArtsist") presArtsistChart!: ChartComponent 
  @ViewChild("tempCorp") tempCorpChart!: ChartComponent

  public oxigOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public freqCardOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public presArtOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      },
      {
        name: "My-series2",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }

  public tempCorpOptions: Partial<ChartOptions> | any = {
    series: [
      {
        name: "My-series",
        data: [0, 0, 0, 0, 0]
      }
    ],
    chart: {
      height: 130,
      type: "line"
    },
    xaxis: {
      categories: ["1", "2", "3", "4", "5"]
    }
  }


  historial: any[] = []; 
  Incidencias: any[]=[];
  subscriptions: Subscription[] = []

constructor(private activatedRoute: ActivatedRoute, private habitacioneService: HabitacionesService,private router: Router, private recetaservice: RecetaService, private incidencias:AlertasReportesService, private stadisticsService: StadisticsService) {}
  
ngOnDestroy(): void {
  this.subscriptions.forEach(sub => {
    sub.unsubscribe()
  })
}

idIngreso: any
mensaje: string = '';

async ngOnInit(): Promise<void> {
  this.activatedRoute.queryParams.subscribe(params => {
    this.idIngreso= params['id'];
  });
  await this.recetaservice.obtenerreceta(this.idIngreso).subscribe((data: any) => {
    this.historial = data;
    console.log('Historial de recetas:', this.historial);
  });
  await this.incidencias.getAlertasReportes(this.idIngreso).subscribe((data: any) => {
    this.Incidencias = data;
    console.log('Historial de incidencias:', this.Incidencias);
  });
  

  this.habitacioneService.habitacion(this.idIngreso).subscribe((data: any) => {
    this.informacionPaciente.nombres = data.nombres;
    this.informacionPaciente.apellidos = data.apellidos;
    this.informacionPaciente.edad = data.edad;
    this.informacionPaciente.sexo = data.sexo;
    this.informacionPaciente.padecimientos = data.padecimientos;
    this.informacionPaciente.alergias = data.alergias;
    this.informacionPaciente.causa_ingreso = data.causa_ingreso;
    this.informacionPaciente.id_enfermera = data.id_enfermera.nombres + ' ' + data.id_enfermera.apellidos;
    this.informacionPaciente.id_especialidad = data.id_especialidad.nombre;
    this.informacionPaciente.id_habitacion = data.id_habitacion.id_habitacion;
  });
  console.log('Historial de recetas:', this.historial);
}

   Receta(){
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
    id_habitacion:0,
  };


  historialIncidencias = [
    {
      horaAlarma: '10:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 1',
      accionesTomadas: 'Acciones 1',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
    {
      horaAlarma: '11:00',
      fecha: '2024-04-09',
      eventoCritico: 'Evento 2',
      accionesTomadas: 'Acciones 2',
    },
  ];
 
  getStadistics(id: number){
    let oxigSubscription = this.stadisticsService.getStadistics(id, "/oxig").subscribe(response => {
      console.log(response)
      this.oxigOptions.series[0] = response.series[0]
      let cont = 0
      response.categories.forEach((category: string) => {
        this.oxigOptions.xaxis.categories[cont] = category
        cont ++
      })
    })
    this.subscriptions.push(oxigSubscription)
    let freqCardSubscription = this.stadisticsService.getStadistics(id, "/freqCard").subscribe(response => {
      this.freqCardOptions.series[0] = response.series[0]
      let cont = 0
      response.categories.forEach((category: string) => {
        this.freqCardOptions.xaxis.categories[cont] = category
        cont ++
      })
    })
    this.subscriptions.push(freqCardSubscription)
    let presArtsistSubscription = this.stadisticsService.getStadistics(id, "/presArtsist").subscribe(response => {
      this.presArtOptions.series[0] = response.series[0]
      let cont = 0
      response.categories.forEach((category: string) => {
        this.presArtOptions.xaxis.categories[cont] = category
        cont ++
      })
    })
    this.subscriptions.push(presArtsistSubscription)
    let presArtdiastSubscription = this.stadisticsService.getStadistics(id, "/presArtdiast").subscribe(response => {
      this.presArtOptions.series[1] = response.series[0]
    })
    this.subscriptions.push(presArtdiastSubscription)
    this.subscriptions.push(presArtsistSubscription)
    let tempCorpSubscription = this.stadisticsService.getStadistics(id, "/tempCorp").subscribe(response => {
      this.tempCorpOptions.series[0] = response.series[0]
      let cont = 0
      response.categories.forEach((category: string) => {
        this.tempCorpOptions.xaxis.categories[cont] = category
        cont ++
      })
    })
    this.subscriptions.push(tempCorpSubscription)
  }

}
