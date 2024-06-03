import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlertasReportesService {
  api_url =environment.url_api +'/api/alertas-reportes/comp';

  constructor(private http: HttpClient) { }

  getAlertasReportes(id: string): Observable<any> {
    const url = `${this.api_url}/${id}`;
    return this.http.get<any>(url);
  }
}
