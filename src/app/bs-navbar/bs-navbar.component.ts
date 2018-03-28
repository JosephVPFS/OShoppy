import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import 'rxjs/add/operator/map';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent{
  user : AppUser

  constructor(private auth : AuthService) { 
    
    this.auth.appUser$
      .subscribe(appUser =>this.user = appUser);
  }

  logout(){
    this.auth.logout();
  }

}
