import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {

  apiUrl = "http://localhost:3030/cartapi/cart";
  constructor(private _http: HttpClient) { }

  getAllProductsInCart(){
    return this._http.get(this.apiUrl);
  };
  getProductsInCartByUserId(User_id:Number){
    return this._http.get(this.apiUrl+"/"+User_id);
  };
  updateCart(data:any , cartid:Number){
    console.log("Data on updateCart",data);
    return this._http.patch(this.apiUrl+"/"+cartid,data);
  }
  createCartForThatUser(User_id:Number,Cart_id:Number){
    let tempCartSchema:any = {
      User_id: User_id,
      Cart_id: Cart_id,
      Cart_products: [
        
      ],
    };
    console.log("TEMPCARTSCHEMA::::",tempCartSchema);
    return this._http.post(this.apiUrl,tempCartSchema);
  }
  deleteFromCart(id:String){
    
  }
}
