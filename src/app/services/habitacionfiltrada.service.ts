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
  buscarPaciente(nombre: string, especialidad: number): Observable<any[]> {
    const url = `${environment.url_api}api/ingresos/busq?nombre=${encodeURIComponent(nombre)}&id_esp=${encodeURIComponent(especialidad)}`;
    return this.http.get<any[]>(url);
  }
  habitacion(id: string): Observable<string>{
    let result =  this.http.get<string>(environment.url_api + 'api/ingresos/'+ id);
    return result;
  }
}
