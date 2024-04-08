import { Component } from '@angular/core';
import { ApiCartService } from '../api-cart.service';
import { ApiProductService } from '../api-product.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiOrderService } from '../api-order.service';
import { ApicarthistoryService } from '../apicarthistory.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  cart:any = [];
  cart_id:any = 0;
  cart_products:any[] = [];
  shipping_price:number = 100;
  User_id = JSON.parse(localStorage.getItem('user')!).User_id;
  total_price_with_shipping_price: any;
  constructor(private _api:ApiCartService , private _apiProduct:ApiProductService, private _apiForOrder:ApiOrderService,private _apiCartHistory:ApicarthistoryService, private _router:Router){
    _api.getProductsInCartByUserId(this.User_id).subscribe(res => {
      if(res == null){
        console.log("res is null");
      }
      else{
        console.log("RES BY USERID:::",res);
        this.cart = ( res as any ).Cart_products;
        this.cart_id = ( res as any ).Cart_id;
        console.log("THIS.CART::::",this.cart);
        console.log(this.cart.length);
        for(var i=0; i<this.cart.length; i++){
          this._apiProduct.getProductById(this.cart[i].Product_id).subscribe((resp:any) => {
            if(resp==null){
              console.log("Resp is null");
            }
            else{
              console.log("Cart in else part ::::: ",this.cart);
              console.log("Product Res",resp);
              this.cart_products.push(resp);
              console.log("CART PRODUCTS::::",this.cart_products);
            }
          })
        }
      }
    })
  }
    updateQty(upqty: number , pid: number){
      for(var i=0;i<this.cart.length; i++){
        if(this.cart[i].Product_id == pid){
          this.cart[i].quantity += upqty;
          if(this.cart[i].quantity==0){
            this.cart.splice(i, 1);
            const currentUrl = this._router.url;
                this._router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                    this._router.navigate([currentUrl]);
                });
          }
          // else{
          //   this.products_in_cart[i] = this.this_product_in_cart;
          // }
          console.log("this producgt in cart at + - btn::::",this.cart);
        }
      }
    
  
    this._api.updateCart(this.cart,this.cart_id).subscribe(res => {
      if (res == null) {
          this.showAlert("Failed to update cart");
      } else {
          this.showAlert("Successfully added to cart");
      }
  });
  }
  showAlert(msg:string) {
    Swal.fire({
      position: "bottom-right",
      icon: "success",
      title: msg,
      showConfirmButton: false,
      timer: 1500
    });
  }
  getQuantity(productId: number): number {
    const cartItem = this.cart.find((item: { Product_id: number; }) => item.Product_id === productId);
    return cartItem ? cartItem.quantity : 0;
  } 
  getTotalForItem(item: any): number {
    return item.Product_price * this.getQuantity(item.Product_id);
  }
  getSubtotal(): number {
    let subtotal = 0;
    for (let item of this.cart_products) {
        subtotal += item.Product_price * this.getQuantity(item.Product_id);
    }
    return subtotal;
  }
  sendOrder(){
    let order = {
      User_id : this.User_id,
      Cart_id : this.cart_id,
      Cart_products : this.cart,
      Order_price : this.total_price_with_shipping_price,
      Order_status : "pending",
    };
    
    console.log(order);
    this._apiForOrder.createOrder(order).subscribe((res) => {
      if(res == null){
        console.log("Response is null for order");
      }
      else{
        console.log("Order placed successfully");
        this._apiCartHistory.createCartForThatUser(this.User_id,this.cart_id,this.cart_products);
        this.cart = [];
        this.cart_products = [];
        this._api.updateCart(this.cart,this.cart_id).subscribe((res)=>{
          if(res == null){
            console.log("didnt empty cart");
          }
          else{
            console.log("Cart Empty");
          }
        });
        this._router.navigate(['/home/orderpage']);
      }
  })
  }

  removeProduct(id:String){
    this._api.deleteFromCart(id)
  }
  productCalled(pid:any){
    this._router.navigate(['/products/' + pid]);
  }
  getfinalprice(total:any) {
    this.total_price_with_shipping_price = total ;
    return this.total_price_with_shipping_price;
  }

}
