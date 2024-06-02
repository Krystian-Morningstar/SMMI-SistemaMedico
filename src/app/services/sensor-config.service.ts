import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorConfigService {
  private apiUrl = 'http://localhost:3000/api/config-sensores';

  constructor(private http: HttpClient) { }

  postSensorConfig(config: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, config, { headers: headers });
  }
}
