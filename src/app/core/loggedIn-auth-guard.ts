import { Injectable } from "@angular/core";
import {Router,Route,CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
// import { AuthService } from "./auth.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class LoggedInAuthGuard implements CanActivate{

    constructor(private _router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('in auth guard')
        const url: string = state.url;
        return this.checkLogin(url);
        // return true;
      }

    checkLogin(url){
        if (Cookie.get('loggedUser')) {
            this._router.navigate(['/app/dashboard']);
            return false;
         }
        // this.router.navigate(['/login']);
        return true;

    }
    getUserDetails() {
       const cookie =  Cookie.get('loggedUser')
        const user = atob(cookie.split('.')[1]);
        return JSON.parse(user);
    }
}