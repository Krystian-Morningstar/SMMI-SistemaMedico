import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SensorConfigService {
  api_url =environment.url_api + 'api/config-sensores';

  constructor(private http: HttpClient) { }

  postSensorConfig(config: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.api_url, config, { headers: headers });
  }

  obtenersensores(id: number): Observable<any>{
    let result =  this.http.get<any>(this.api_url +"/"+ id);
    return result;
  }



  
}
