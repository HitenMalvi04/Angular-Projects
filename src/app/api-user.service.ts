import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {

  apiUrl = "http://localhost:3030/userapi/users";
  constructor(private _http: HttpClient) { }

  getAllUsers(){
    return this._http.get(this.apiUrl);
  };
  getById(id:any){
    return this._http.get(this.apiUrl + '/' + id);
  }
  getByUsernamePass(username : any , password : any){
    var temp = this._http.get(this.apiUrl + '/' + username + '/' + password);
    return this._http.get(this.apiUrl + '/' + username + '/' + password);
  }
  // delete(id:any){
  //   return this._http.delete(this.apiUrl + '/' + id);
  // };
  save(data:any){
    console.log("DATAINAPISERVICE::::",data);
    return this._http.post(this.apiUrl, data);
  }
}
