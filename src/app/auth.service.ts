import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable'

@Injectable()
export class AuthService {

  constructor(private afAuth : AngularFireAuth, private userService : UserService) { }

  login(){
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.auth.signOut();
  }

  getCurrentUser(){
    return this.afAuth.authState;
    
  }

  get appUser$(){
    return this.getCurrentUser()
      .switchMap(user => {
        if(user) return this.userService.getUser(user.uid);
        return Observable.of(null);
      });
  }
}
