import { Component } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { __param } from 'tslib';
import { ActivatedRoute } from '@angular/router';
import { ApiCartService } from '../api-cart.service';
import { ApiUserService } from '../api-user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.css'
})
export class ProductDetailPageComponent {
  product: any = {};
  user:any = {};
  products_in_cart:any = [];
  this_product_in_cart:any = {};
  constructor(private _apiProduct:ApiProductService,private _apiForCart:ApiCartService ,private route: ActivatedRoute,private _apiForUser:ApiUserService){
    

    const id = this.route.snapshot.paramMap.get('id');
    this._apiProduct.getProductById(id)
      .subscribe(p =>  {
        this.product = p;
        console.log("PRODUCT IS:::",this.product);
      });
      
      _apiForUser.getById(JSON.parse(localStorage.getItem('user')!).User_id).subscribe(res => {
        if(res == null){
          console.log("User not found");
        }
        else{
          console.log("RES OF USER::::",res);
          this.user = res;
          console.log("USERId:::",this.user.User_id);
          _apiForCart.getProductsInCartByUserId(this.user.User_id).subscribe(res => {
            if(res == null){
              console.log("User not found");
            }
            else{
              console.log("RES OF PRODUCT::::::::",res);
              this.products_in_cart = ((res as any).Cart_products);
              console.log("In cart PRODUCT::::::::",this.products_in_cart);
              // let flag = false;
              for(var i=0;i<this.products_in_cart.length; i++){
                if(this.products_in_cart[i].Product_id == this.product.Product_id){
                  // this.products_in_cart[i].quantity += 1;
                  // flag = true;
                  // break;
                  this.this_product_in_cart = this.products_in_cart[i];
                  console.log("this producgt in cart::::",this.this_product_in_cart);
                }
              }
              // if(flag == false){
              //   this.products_in_cart.push({"Product_id":Product_id, "quantity":1});
              // }
            }
          });
        }
      });
      
    // _apiForCart.getProductsInCartByUserId(this.user.User_id).subscribe(res => {
    //   if(res == null){
    //     console.log("User not found");
    //   }
    //   else{
    //     console.log("RES OF PRODUCT::::::::",res);
    //     this.products_in_cart = ((res as any).Cart_products);
    //     console.log("In cart PRODUCT::::::::",this.products_in_cart);
    //   }
    // });
  }
  updateQty(upqty: number){
    this.this_product_in_cart.quantity += upqty;
    for(var i=0;i<this.products_in_cart.length; i++){
      if(this.products_in_cart[i].Product_id == this.product.Product_id){
        // this.products_in_cart[i].quantity += 1;
        // flag = true;
        // break;
        // this.this_product_in_cart = this.products_in_cart[i];
        if(this.this_product_in_cart.quantity==0){
          this.products_in_cart.splice(i, 1);
          this.this_product_in_cart = null;
        }
        else{
          this.products_in_cart[i] = this.this_product_in_cart;
        }
        console.log("this producgt in cart at + - btn::::",this.this_product_in_cart);
      }
    }
    this._apiForCart.updateCart(this.products_in_cart,this.user.Cart_id).subscribe(res => {
      if (res == null) {
          this.showAlert("Failed to update cart");
      } else {
          this.showAlert("Successfully added to cart");
      }
  });
  }
  addToCart(Product_id: number, quantity: number) {
    // Fetch the cart based on Cart_id
    // this._apiForCart.getProductsInCartByUserId(this.user.Cart_id).subscribe((cart: any) => {
    //     if (cart == null) {
    //         this.showAlert("Cart is null at addToCart");
    //     } else {
           
    //         // Update the cart with the modified cart products
    //         this._apiForCart.updateCart(cart,cart.Cart_id).subscribe(res => {
    //             if (res == null) {
    //                 this.showAlert("Failed to update cart");
    //             } else {
    //                 this.showAlert("Successfully added to cart");
    //             }
    //         });
    //     }
    // });
    if(this.products_in_cart.length == 0 ){
      this.products_in_cart.push({"Product_id":Product_id, "quantity":1});
      this.this_product_in_cart=({"Product_id":Product_id, "quantity":1});
    }
    else{
      let flag = false;
      for(var i=0;i<this.products_in_cart.length; i++){
        if(this.products_in_cart[i].Product_id == Product_id){
          this.products_in_cart[i].quantity += 1;
          this.this_product_in_cart = this.products_in_cart[i];
          flag = true;
          break;
        }
      }
      if(flag == false){
        this.products_in_cart.push({"Product_id":Product_id, "quantity":1});
        this.this_product_in_cart = ({"Product_id":Product_id, "quantity":1});
      }
    }
    console.log("PRODUCTSINCART::::",this.products_in_cart);
    this._apiForCart.updateCart(this.products_in_cart , this.user.Cart_id).subscribe(res => {
      if(res == null) {
        
        this.showAlert("res is null at addToCart");
      }
      else {
        this.showAlert("Successfully added to cart");
      }
    })
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
  

}
