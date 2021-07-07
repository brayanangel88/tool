import { Injectable } from '@angular/core';
import { first } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {


  constructor(public afAuth: AngularFireAuth) {

  }

   login(email: string, password: string) {

    return this.afAuth.signInWithEmailAndPassword(email, password)

  }

   register(email:string,password:string) {
  
     return this.afAuth.createUserWithEmailAndPassword(email, password)
   
  }

   logout() {
    
      return this.afAuth.signOut()
   
  }




}
