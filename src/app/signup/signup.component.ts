import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../api-user.service';
import { ApiCartService } from '../api-cart.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  constructor(private _router: Router, private _apiUser: ApiUserService, private _apiCart:ApiCartService) { }
  signupform : FormGroup = new FormGroup({
    username : new FormControl('' , [Validators.required]),
    password : new FormControl('' , [Validators.required]),
    repassword : new FormControl('' , [Validators.required]),
  },
  { validators: passwordMatchValidator }
  );
  showPassword: boolean = false;
  errmsg: string = "";
  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }
  signinUpUser(){
    console.log("SIGNUPFORMVALUE::::",this.signupform.value);
    this._apiUser.save(this.signupform.value).subscribe((res:any) => {
      if(res == null){
        this.errmsg = "Error signing up";
      }
      else{
        this.errmsg = "correct";
        this._apiCart.createCartForThatUser(res.User_id,res.Cart_id).subscribe((cart:any) => {
          if(cart == null){
            console.log("Cart Not Made");
          }else{
            console.log("Cart Made");
          }
        });
        this._router.navigate(['/']);
      }
    });
  }
}
const passwordMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
  const password = control.get('password');
  const repassword = control.get('repassword');

  return password && repassword && password.value === repassword.value ? null : { 'passwordMismatch': true };
};