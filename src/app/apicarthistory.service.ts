import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApicarthistoryService {
  apiUrl = "http://localhost:3030/carthistory/cart";
  constructor(private _http: HttpClient) { }

  getAllProductsInCart(){
    return this._http.get(this.apiUrl);
  };
  getProductsInCartByUserId(User_id:Number){
    return this._http.get(this.apiUrl+"/"+User_id);
  };
  createCartForThatUser(User_id:Number,Cart_id:Number,Cart_products:any){
    let tempCartSchema:any = {
      User_id: User_id,
      Cart_id: Cart_id,
      Cart_products: Cart_products,
    };
    console.log("TEMPCARTSCHEMA::::",tempCartSchema);
    return this._http.post(this.apiUrl,tempCartSchema);
  }
}
