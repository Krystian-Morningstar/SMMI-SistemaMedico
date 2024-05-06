import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router desde '@angular/router'
import { AuthService } from '../services/auth.service';
import { login } from '../models/appModel.model';
import { SistemaService } from '../services/sistema.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  mostrarnavar: boolean = false;

  constructor(private auth: AuthService, private router: Router,  private servicio: SistemaService){} // Inyecta Router en el constructor

  loginProcess(object: any){
    console.log(object)
    this.auth.login(object.value).subscribe(result => {
      if(result.message == "Sesion_Activa"){
        console.log("sesión válida")
        alert(result.message)
        login(this.router); // Llama a login y pasa el objeto Router como argumento
        this.mostrarMenu();
      }
      else{
        alert("los datos registrados no son correctos")
      }
    })
  }

  mostrarMenu() {
    this.mostrarnavar = !this.mostrarnavar;
    this.servicio.Actualizar_navar(this.mostrarnavar);
  }
}
