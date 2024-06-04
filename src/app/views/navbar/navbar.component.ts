import { Component, OnInit} from '@angular/core';
import {SistemaService} from './../../services/sistema.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  constructor(private servicio: SistemaService){
  }
  mostrar : boolean = false;
  mostrarAlarmaa : boolean = false;

  ngOnInit(): void {
      this.mostrar = false;
    }

    mostrarMenu() {
      this.mostrar = !this.mostrar; // Alternar el estado del menú
      this.servicio.Actualizar_Menu(this.mostrar);
    }
  

  

}
