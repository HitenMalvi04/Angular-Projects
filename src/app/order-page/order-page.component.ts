import { Component } from '@angular/core';
import { ApiOrderService } from '../api-order.service';
import { HttpClientModule } from '@angular/common/http';
import { ApiProductService } from '../api-product.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.css'
})
export class OrderPageComponent {
  orders: any[] = []; // Array to store orders
  User_id = JSON.parse(localStorage.getItem('user')!).User_id;
  constructor(private _apiForOrder: ApiOrderService , private _apiForProducts:ApiProductService) { }

  ngOnInit(): void {
    this.getAllOrders(); // Call the method to fetch all orders when the component initializes
  }

  getAllOrders() {
    this._apiForOrder.getOrdersByUserId(this.User_id).subscribe((res:any) => {
      if(res == null){
        console.log("No order found");
      }
      else{
        this.orders = res;
      }
    })
  }
  // fetchOrders() {
  //   // Assuming your API endpoint for orders
  //   this._apiForProducts.get<any>('YOUR_ORDERS_API_ENDPOINT').subscribe(data => {
  //     this.orders = data; // Assuming your orders data is an array
  //     this.fetchProductNames(); // Call method to fetch product names
  //   });
  // }
  fetchProductNames() {
    // Loop through each order and make a request to fetch product names
    this.orders.forEach(order => {
      order.Cart_products.forEach((cartProduct: any) => {
        // Assuming your API endpoint for fetching product names
        this._apiForProducts.getProductById(this.User_id).subscribe((productData:any) => {
          // Assuming your product data structure contains a property called "name"
          console.log(productData.Product_name);
          cartProduct.Product_name = productData.Product_name; // Assuming product name is stored in "name" property
        });
      });
    });
  }
}
