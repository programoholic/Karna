import { Injectable } from "@angular/core";
import {Router,Route,CanActivate, CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
// import { AuthService } from "./auth.service";
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class AppAuthGuard implements CanActivate,CanActivateChild,CanLoad{

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log('in auth guard')
        const url: string = state.url;
        return this.checkLogin(url);
        // return true;
      }
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        return true;
    }

    canLoad(route: Route): boolean {
        console.log('in auth guard can load')
        return this.checkLogin('');
    }

    checkLogin(url){
        if (Cookie.get('loggedUser')) { return true; }
        this.router.navigate(['/login']);
        return false;

    }

}