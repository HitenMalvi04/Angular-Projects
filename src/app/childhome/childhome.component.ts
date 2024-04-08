import { Component } from '@angular/core';
import { ApiProductService } from '../api-product.service';

@Component({
  selector: 'app-childhome',
  templateUrl: './childhome.component.html',
  styleUrl: './childhome.component.css'
})
export class ChildhomeComponent {
  products:any[] = [];
  constructor(private _apiForProducts:ApiProductService){
    _apiForProducts.getAllProducts().subscribe((prod :any )=>{
      if(prod==null){
        console.log("Product is null");
      }
      else{
        this.products = prod;
      }
    })
  }

}
