import { Component, OnInit, HostListener} from '@angular/core';
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

    @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.mostrar == true) {
      this.mostrar = false;
      this.servicio.Actualizar_Menu(false);
    }
  }
  mostrarMenu(event: Event) {
    event.stopPropagation(); 
    this.mostrar = !this.mostrar; 
    this.servicio.Actualizar_Menu(this.mostrar);
  }
  
}
