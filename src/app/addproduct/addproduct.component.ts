import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import { ApiProductService } from '../api-product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.css'
})
export class AddproductComponent {

  constructor(private _api:ApiProductService,private _router:Router, private fb: FormBuilder){}
  
  newProductForm = this.fb.group({ 
    Product_name: new FormControl('',Validators.required),
    Product_images: this.fb.array([]),
    Product_description: new FormControl('',Validators.required),
    Product_price: new FormControl('',Validators.required),
    Product_stock: new FormControl('',Validators.required),
    Product_catagory : new FormControl('',Validators.required),
    Product_features: new FormArray([]),
  }); 
  get Product_images() { 
    return this.newProductForm.get('Product_images') as FormArray; 
  } 
  addImage() {
    this.Product_images.push(new FormControl('', Validators.required));
  }
  

  get Product_features(): FormArray { 
    return this.newProductForm.get('Product_features') as FormArray; 
  } 
  
  addFeatures() { 
    this.Product_features.push(new FormGroup({
      feature_name: new FormControl('',Validators.required), // default values or validators can be added
      feature_value: new FormControl('',Validators.required),
    })); 
  } 

  onSubmit() { 
    console.log("ONSUBMIT:::",this.newProductForm.value); 
    this._api.addProduct(this.newProductForm.value).subscribe(res=>{
      if(res == null){
        console.log("Res is null");
      }
      else{
        this._router.navigate(['/home/products']); 
      }
    });
  } 
}
