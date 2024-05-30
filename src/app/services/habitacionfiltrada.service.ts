import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IngresosPorEspecialidadService {
    private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  obtenerIngresosPorEspecialidad(idEspecialidad: number): Observable<any[]> {
    const url = `${this.apiUrl}/api/ingresos/especialidad/${idEspecialidad}`;
    return this.http.get<any[]>(url);
  }
}
