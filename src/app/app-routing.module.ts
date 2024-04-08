import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ProductDetailPageComponent } from './product-detail-page/product-detail-page.component';
import path from 'path';
import { ChildhomeComponent } from './childhome/childhome.component';
import { TestComponent } from './test/test.component';
import { OrderPageComponent } from './order-page/order-page.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: 'home', component:HomeComponent, children: [
    { path: '', component: ChildhomeComponent},
    { path: 'products/:id', component: ProductDetailPageComponent},
    { path: 'products', component: ProductListComponent},
    { path: 'cart', component: CartComponent},
    { path: 'orderpage', component: OrderPageComponent},
    { path: 'contact', component: ContactComponent},
  ]},
  { path: 'signup', component: SignupComponent},
  { path: '', component: LoginComponent},
  { path: 'admin', component: AdminHomeComponent},
  { path: 'addproduct', component: AddproductComponent},
  { path: 'test', component: TestComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
