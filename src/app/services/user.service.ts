import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/user.model';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class UserService {
   private apiUrl = 'https://smmi-api-production.up.railway.app/api/auth/login'; // Reemplaza 'URL_DEL_API' con la URL de tu API

   constructor(private http: HttpClient) {}
   headers= new HttpHeaders({
    'Content-Type': 'application/json'
  })

  option = {headers: this.headers}

   loginUser(matricula: string, contraseña: string): Observable<any> {
    return this.http.post<string>(this.apiUrl,{matricula, contraseña});
  }
   }
 

 //Para Prueba Local..
// export class UserService {
//   // Simulación de usuario autenticado (puedes modificar según tus necesidades)
//   private usuarioAutenticado: Usuario = {
//     matricula: 'A24032',
//     password: 'Password123'
//   };

//   constructor() {}

//   loginUser(usuario: Usuario): Observable<any> {
//     if (this.usuarioAutenticado.matricula === usuario.matricula && this.usuarioAutenticado.password === usuario.password) {
//       return of({ success: true }); // Simulación de autenticación exitosa
//     } else {
//       return of({ success: false }); // Simulación de autenticación fallida
//     }
//   }
// }