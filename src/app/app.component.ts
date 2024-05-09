import { Component } from '@angular/core';
import { PrincipalComponent } from './principal/principal.component';
import { SistemaService } from '../app/services/sistema.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Principal';
  showUserProfile = false;
  showAlarma = false;
  mostrar: boolean = false;
  mostrarAlarma: boolean = false;
  mostrarNavar: boolean = false;





  constructor(private servicio: SistemaService) {}

  toggleUserProfile() {
    this.showUserProfile = !this.showUserProfile;
  }

  toggleAlarma() {
    this.showAlarma = !this.showAlarma;
  }


  async ngOnInit() {
    this.servicio.menuIn$.subscribe((mostrar) => {
      this.mostrar = mostrar;
    });
    this.servicio.alertaIn$.subscribe((mostrarAlarma) => {
      this.mostrarAlarma = mostrarAlarma;
    });
    this.servicio.navarIn$.subscribe((mostrarNavar) => {
      this.mostrarNavar = mostrarNavar;
    });


  }
}
