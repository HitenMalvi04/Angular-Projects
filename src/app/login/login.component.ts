import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '../api-user.service';
import { ApiCartService } from '../api-cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  error_msg = "";
  constructor(private _router: Router, private _api: ApiUserService, private _apiCart:ApiCartService ) { }
  loginForm : FormGroup = new FormGroup({
    username : new FormControl('' , [Validators.required]),
    password : new FormControl('' , [Validators.required]),
  });
  checkForLogin(){
    console.log("LOGIN FORM VALUES:::",this.loginForm.value);
    this._api.getByUsernamePass(this.loginForm.value.username , this.loginForm.value.password).subscribe((res:any)=>{
      console.log("RES:::",res);
      if(res == null){
        this.error_msg = "Invalid username or password.";
      }
      else{
        this.error_msg = "correct";
        
          localStorage.setItem('user' , JSON.stringify({
            userName : this.loginForm.value.username,
            password : this.loginForm.value.password,
            User_id : res.User_id,
          }));
          this._router.navigate(['/home']);
      }
    });
  }
  clearError() {
    this.error_msg = '';
  }

}
