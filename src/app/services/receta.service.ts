import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NuevaReceta } from '../models/Receta.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  private apiUrl = 'https://smmi-api-production.up.railway.app/api/recetas';

  constructor(private http: HttpClient) { }

  crearReceta(receta: NuevaReceta): Observable<any> {
    return this.http.post<any>(this.apiUrl, receta)
      .pipe(
        catchError(this.handleError)
      );
  }

  obtenerreceta(id: string): Observable<string>{
    let result =  this.http.get<string>(environment.url_api + 'api/recetas/'+ id);
    return result;
  }

  private transformarReceta(data: any): any {
    return {
      matricula_medico: data.medico.matriculaMedico,
      id_ingreso: data.ingreso.id_ingreso,
      medicamentos: data.medicamentos,
      indicaciones_addic: data.indicaciones_addic,
      fecha: data.fecha_registro
    };
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error desconocido.';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error ${error.status}: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
