import { Component } from '@angular/core';
import { ApiUserService } from '../api-user.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {
  users: any[] = [] ;
  nousermsg = "";
  constructor(private _api:ApiUserService){}
  getUsers(){
    this._api.getAllUsers().subscribe(res=>{
      console.log(res);
      if(res == null){
        this.nousermsg = "res is null";
      }
      else{
        this.users.push(...Object.values(res));
        this.nousermsg = "data found"
        console.log(this.users);
      }
    })
  }
}
