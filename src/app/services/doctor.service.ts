import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  api_url =environment.url_api + 'api/medicos'; // URL base de la API

  constructor(private http: HttpClient) { }

  obtenerMedico(matricula: string): Observable<any> {
    const url = `${this.api_url}/${matricula}`;
    return this.http.get<any>(url);
  }
}
