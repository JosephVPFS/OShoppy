import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserService } from './user.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminAuthGaurd implements CanActivate{

  constructor(private auth : AuthService, private userService : UserService) { }

  canActivate(){
    return this.auth.appUser$
      .map(appUser => appUser.isAdmin);
  }

}
