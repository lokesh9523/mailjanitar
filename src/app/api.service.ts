import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { default as config } from './views/config';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
API_URL = config.API_URL;
  constructor(private httpClient: HttpClient) { }

  Register(data){
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/register`, data, { headers: headers });
  }
  Login(data){
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/login`, data, { headers: headers });
  }
}
