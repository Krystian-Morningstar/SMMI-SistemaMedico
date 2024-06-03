import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosPorEspecialidadService {
  api_url =environment.url_api + 'api/ingresos/especialidad';

  constructor(private http: HttpClient) { }

  obtenerIngresosPorEspecialidad(idEspecialidad: number): Observable<any[]> {
    const url = `${this.api_url}/${idEspecialidad}`;
    return this.http.get<any[]>(url);
  }
}
