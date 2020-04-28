import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnvConfigService {

  public appConfig;

  constructor(private http: HttpClient) {

   }


  loadAppConfig() {
    return this.http.get('/assets/data/env.config.json')
      .toPromise()
      .then(data => {
        this.appConfig = data;
        console.log('data..'+ this.appConfig.apiUrl);
      });
  }

  getConfig() {
    return this.appConfig;
  }
}
