import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { default as config } from './views/config';

import { Subject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
API_URL = config.API_URL;

langSubject = new Subject<string>();
language$ = this.langSubject.asObservable();
count;
  constructor(private httpClient: HttpClient, public localstorageservice:LocalStorageService) { 
    this.count = this.localstorageservice.get('credits');
  }

  Register(data){
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/register`, data, { headers: headers });
  }
  Login(data){
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/login`, data, { headers: headers });
  }
  UpdatePartner(data){
    let headers = new HttpHeaders();
    return this.httpClient.put(`${this.API_URL}/partner/`+data.login_id, data, { headers: headers });
  }
  getPartnerData(loginId){
    let headers = new HttpHeaders();
    return this.httpClient.get(`${this.API_URL}/partner/`+loginId, { headers: headers });
  }
  UploadFile(loginId,filedata){
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/partner/`+loginId, filedata, { headers: headers });
  }
  DeletePartnerdata(loginId,dataId){
    let headers = new HttpHeaders();
    return this.httpClient.delete(`${this.API_URL}/partner/`+ loginId +`/data/`+dataId, { headers: headers });
  }
  getPartnerDetails(loginId){
    let headers = new HttpHeaders();
    return this.httpClient.get(`${this.API_URL}/partner/`+loginId+`/partner_details`, { headers: headers });
  }
}
