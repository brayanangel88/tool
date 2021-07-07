import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.afAuth.authState.pipe(map(auth => {
      if (!auth) {
        if (state.url === "/") {
          return true;
        }
        this.router.navigate(["/"])
        return false;
      }
      if (state.url === "/") {
        this.router.navigate(["home"])
      }
      return true;
    }))

  }
  
}
function isNullOrUndefined(auth: any) {
  throw new Error('Function not implemented.');
}

