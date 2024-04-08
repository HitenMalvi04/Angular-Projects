import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiOrderService {
  apiUrl = "http://localhost:3030/orderapi/orders";
  constructor(private _http: HttpClient) { }

  createOrder(newOrder:any){
    console.log("createOrder called");
    console.log("NEW PRODUCT:::::",newOrder);
    return this._http.post(this.apiUrl,newOrder);
  }
  getOrdersByUserId(userId:string){
    return this._http.get(this.apiUrl + "/" + userId);
  }
}
