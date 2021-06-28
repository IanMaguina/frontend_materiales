import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { GlobalSettings } from '../shared/settings';
import { AuthService } from '../servicios/token.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private autenticacionService: AutenticacionService
    ) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log("loading url=" + state.url);

        if (this.autenticacionService.isLoggedIn()) {
            // logged in so return true    
            console.log("usuario atenticado TRUE");
            
            return true;

        } else {

            // not logged in so redirect to login page with the return url      
            console.log("autenticando");
            this.autenticacionService.signout();
            this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }


    }

 

}