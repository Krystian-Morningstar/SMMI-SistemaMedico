import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  apiUrl = 'http://localhost:3000/api/medicos'; // URL base de la API

  constructor(private http: HttpClient) { }

  obtenerMedico(matricula: string): Observable<any> {
    const url = `${this.apiUrl}/${matricula}`;
    return this.http.get<any>(url);
  }
}
