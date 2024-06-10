import { Component, OnInit } from '@angular/core';
import { perfil_interface } from 'src/app/models/perfil.model';
import { Router } from '@angular/router';
import { PerfilService } from 'src/app/services/perfil.service';
import {SistemaService} from './../../services/sistema.service'


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
     
  
   constructor(private router: Router, private perfilService: PerfilService, private servicio: SistemaService) {}
   ngOnInit(): void {
    this.obtenerPerfilFromCache();
  }

  async obtenerPerfilFromCache() {
    let cachedProfile = localStorage.getItem('cachedProfile');
    if (cachedProfile) {
      this.perfil = JSON.parse(cachedProfile);
    } else {
      await this.obtenerPerfil();
    }
  }

   perfil: perfil_interface={
    nombres: "",
    apellidos: "",
    matricula: "",
    telefono:"",
    imagen:"",
    especialidad:[],
   }

   async obtenerPerfil(){
      let matricula = localStorage.getItem('matricula');
      if (matricula !== null) {
        let a : any= await this.perfilService.perfil(matricula).toPromise();
        this.perfil.nombres = a.nombres;
        this.perfil.apellidos = a.apellidos;
        this.perfil.matricula = matricula;
        this.perfil.telefono = a.telefono;
        this.perfil.imagen = a.url_img;
        this.perfil.especialidad = a.especialidades;
        localStorage.setItem('especialidad', JSON.stringify(this.perfil.especialidad));
      }
    }

   cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('matricula');
    localStorage.removeItem('cachedProfile');
    location.reload();
    this.router.navigate(['/login']);
   } 
   
}
