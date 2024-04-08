import { Component } from '@angular/core';
import { ApiProductService } from '../api-product.service';
import { Router } from '@angular/router';
import { ApiCartService } from '../api-cart.service';
import { error } from 'console';
import { ApiUserService } from '../api-user.service';
import { delay } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  products: any[] = [];
  err:String = "";
  products_in_cart:any[] = [];
  user:any = {};
  cartsym=0;
  ngOnInit(): void {
    // Initialize filteredProducts with all products
    // this.filteredProducts = this.products.slice();
  }
  constructor(private _apiForProduct:ApiProductService, private _router:Router, private _apiForCart:ApiCartService, _apiForUser:ApiUserService){
    
    _apiForProduct.getAllProducts().subscribe(res =>{
      if(res == null){
        this.err = "Res is null"
      }
      else{
        this.products.push(...Object.values(res));
        this.filteredProducts = this.products.slice();
      }
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
          }
        });
      }
    });
    
    
  }
  filteredProducts: any[] = [];
  priceRanges: any[] = [
    { name: 'All Price', min: 0, max: Infinity },
    { name: 'Rs. 0 - 100', min: 0, max: 100 },
    { name: 'Rs. 101 - 200', min: 101, max: 200 },
    { name: 'Rs. 201 - 500', min: 201, max: 500 },
    { name: 'Rs. 501 - 800', min: 501, max: 800 },
    { name: 'Rs. 801 - 1000', min: 801, max: 1000 },
    { name: 'Rs. 1001 - 1500', min: 1001, max: 1500 },
    { name: 'Rs. 1501 - 2000', min: 1501, max: 2000 },
    // Add more price ranges as needed
  ];
  

  filterProductsByPrice(minPrice: number, maxPrice: number) {
    this.filteredProducts = this.products.filter(product =>
      product.Product_price >= minPrice && product.Product_price <= maxPrice
    );
  }
  
  
  
  addToCart(Product_id:Number){
    this.cartsym = 1;
    if(this.products_in_cart.length == 0 ){
      this.products_in_cart.push({"Product_id":Product_id, "quantity":1});
    }
    else{
      let flag = false;
      for(var i=0;i<this.products_in_cart.length; i++){
        if(this.products_in_cart[i].Product_id == Product_id){
          this.products_in_cart[i].quantity += 1;
          flag = true;
          break;
        }
      }
      if(flag == false){
        this.products_in_cart.push({"Product_id":Product_id, "quantity":1});
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
    this.cartsym = 0;
  }
  opencart(){
     this._router.navigate(['cart']);
  }
  productCalled(pid:any){
    this._router.navigate(['home/products/'+pid]);
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
