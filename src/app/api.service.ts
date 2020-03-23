import { Injectable, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { default as config } from './views/config';

import { Subject } from 'rxjs';
import { LocalStorageService } from 'ngx-store';
@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {
  API_URL = config.API_URL;

  wsSubject = new Subject<string>();
  webSocket$ = this.wsSubject.asObservable();
  token;

  count;

  constructor(private httpClient: HttpClient, public localstorageservice: LocalStorageService) {
    this.count = this.localstorageservice.get('credits');
  }

  ngOnInit() {
    //console.log("iam hereeeee");
    const url = config.WEB_URL;
    const connection = new WebSocket(url)
    connection.onopen = () => {
      connection.send('Message From Client')
    }

    connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`)
    }

    connection.onmessage = (e) => {
      if (e.data) {
       // console.log(e.data,"=======================");
        this.wsSubject.next(e.data);
        // this.apiService.getUserdetails(this.localstorageservice.get('login_id')).subscribe((partnerdata:any)=>{
        //   if(partnerdata){
        //     // console.log(partnerdata,"===================")
        //     data.forEach(element => {
        //       if(element.login_id === this.localstorageservice.get('login_id')){
        //         this.localstorageservice.set('credits',partnerdata.data.partner_detail.amount);
        //          this.apiService.count = partnerdata.data.partner_detail.amount;
        //          this.showaddedcredits = element.value * 1000;
        //          this.showalert = true;
        //          setTimeout(()=>{    //<<<---    using ()=> syntax
        //           this.showalert = false;
        //      }, 1000);
        //       }
        //     });

        //   }
        // },error=>{
        //   alert(error.error.data);
        // })
      }
    }
  }

  Register(data) {
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/register`, data, { headers: headers });
  }
  Login(data) {
    let headers = new HttpHeaders();
    return this.httpClient.post(`${this.API_URL}/login`, data, { headers: headers });
  }
  updateUser(data) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/partner/` + data.login_id, data, { headers: headers });
  }
  getUserData(loginId) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/partner/` + loginId, { headers: headers });
  }
  UploadFile(loginId, filedata) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.post(`${this.API_URL}/partner/` + loginId, filedata, { headers: headers });
  }
  deleteUserData(loginId, dataId) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.delete(`${this.API_URL}/partner/` + loginId + `/data/` + dataId, { headers: headers });
  }
  getUserdetails(loginId) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/partner/` + loginId + `/partner_details`, { headers: headers });
  }
  updateUserData(loginId, dataId, data) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/partner/` + loginId + `/data/` + dataId, data, { headers: headers });
  }
  getAllUsers() {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/admin/partners/`, { headers: headers });
  }
  buyEther(loginId, data) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/partner/` + loginId + `/ether`, data, { headers: headers });
  }
  addEtheraccount(data) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/partner/` + data.login_id + `/ether`, data, { headers: headers });
  }
  depositeJan(data) {
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.post(`${this.API_URL}/partner/` + data.login_id + `/request`, data, { headers: headers });
  }
  cleanMail(data){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/partner/`+data.login_id+`/file/`+data.file_id+`/clean`, { headers: headers });
  }
  getAllTransaction(){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/admin/ether/transcations`, { headers: headers });
  }
  getUserHistory(login_id){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/admin/partner/`+login_id+`/history`, { headers: headers });
  }
  addDomain(data){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.post(`${this.API_URL}/domain`, data, { headers: headers });
  }
  updateDomain(data,id){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/domain/`+id, data, { headers: headers });
  }
  getAllDomain(){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/domain`, { headers: headers });
  }
  getDomainById(id){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/domain/`+id, { headers: headers });
  }
  addUrl(data){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.post(`${this.API_URL}/url`, data, { headers: headers });
  }
  getAllUrl(){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/url`, { headers: headers });
  }
  updateUrl(data,id){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.put(`${this.API_URL}/url/`+id, data, { headers: headers });
  }
  geturlById(id){
    let headers = new HttpHeaders({ 'authorization': this.localstorageservice.get('token') });
    return this.httpClient.get(`${this.API_URL}/url/`+id, { headers: headers });
  }
}
