import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiProductService {

  apiUrl = "http://localhost:3030/productapi/products";
  constructor(private _http: HttpClient) { }

  getAllProducts(){
    return this._http.get(this.apiUrl);
  };
  addProduct(newProduct:any){
    console.log("addProduct called");
    console.log("NEW PRODUCT:::::",newProduct);
    return this._http.post(this.apiUrl,newProduct);
    
  }
  getProductById(Product_id:any){
    console.log("PRODUCT ID::",Product_id);
    return this._http.get(this.apiUrl + '/' + Product_id);
  }
  // delete(id:any){
  //   return this._http.delete(this.apiUrl + '/' + id);
  // };
}
