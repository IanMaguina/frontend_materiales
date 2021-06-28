import { Injectable } from '@angular/core';
//import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './token.service';
import { ResourceService } from './resource.service';
import { UsuarioService } from './usuario.service';
import { GoogleLoginProvider } from "angularx-social-login";
import { GlobalSettings } from '../shared/settings';
import { SocialAuthService } from "angularx-social-login";
//import {PrivilegioService} from './privilegio.service'

import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  privileges: any;
  loggedIn:boolean = false;


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService,
    //private cookieService: CookieService,
    private cookieService:CookieService,
    private resourceService: ResourceService,
    private socialAuthService: SocialAuthService,
    //private privilegioService:PrivilegioService

  ) {

  }


  signInWithGoogle(): Promise<any> {

    return new Promise((resolve, reject) => {
      //Getting access token
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
        this.usuarioService.getUsuarioPorCorreo(data.email).then((u)=>{
          //let menu=JSON.stringify(this.privilegioService.mostrarMenu(u['usuario']));
          //this.cookieService.put("_menu_session",menu );
          //console.log("menu --->"+menu);
          //console.log("usuario --->"+JSON.stringify(u['usuario']));
          this.cookieService.put("_user_session", JSON.stringify(u['usuario']));
          console.log("user info was saved....");
          resolve(u['usuario']);

        })
      }).catch(err => {
        console.log("Error when loading user info..." + err)
        reject(err);
      });


    });

  }

  /*   this.authService.obtainAccessToken(loginData).then(
      () => {
        console.log("Login successful...");
        console.log("username =" + loginData.username);
        //Getting user data
        this.usuarioService.getUserByUsername(loginData.username).then((data) => {
          let fullName = "";
          if (data.firstName) {
            fullName = data.firstName;
          }
  
          if (data.lastName) {
            fullName = fullName + " " + data.lastName;
          }
  
          if (data.maternalName) {
            fullName = fullName + " " + data.maternalName;
          }
  
          let sessionData = { 'accountId': data.id, 'accountName': '', 'role': '' };
          sessionData.accountName = fullName;
  
          if (data.rolesList) {
            sessionData.role = data.rolesList;
          }
  
          this.cookieService.set("_user_session", JSON.stringify(sessionData));
  
          console.log("user info was saved....");
          resolve("OK");
  
  
        }).catch(err => {
          console.log("Error when loading user info..." + err)
          reject(err);
        });
  
      }
    ).catch(err => {
  
      reject(err);
  
    });
   */

  signout() {
    //Audit
    //let userId = this.getUserInfo().accountId;
    //await this.auditService.auditLogoutEvent(userId);       
    //console.log("logout event registered....");
    this.cookieService.remove("_user_session");
    this.cookieService.remove("_menu_session");
    this.socialAuthService.signOut().then().catch(
      err => {
        console.log("Error al cerrar sesion info..." + err)
      }
    );
    //console.log('bbbbbbbbbbbbbbbbbbb');
    this.loggedIn = false;
    this.authService.removeAccessToken();
    this.authService.removeRefreshToken();
    this.privileges = null;
    //localStorage.removeItem("_user_session");
   
    
  }

  getUserInfo() {
    //let sessionData = localStorage.getItem('_user_session');        
    let sessionData = this.cookieService.get("_user_session");
    //console.log('sessionDataa-->'+JSON.stringify(this.cookieService.get("_user_session")));
    if (sessionData) {
      return JSON.parse(sessionData);
    }
    return null;
  }

  getUserMenuInfo() {
    //let sessionData = localStorage.getItem('_user_session');        
    let sessionMenuData = this.cookieService.get("_menu_session");
    //console.log('sessionDataa-->'+JSON.stringify(this.cookieService.get("_user_session")));
    if (sessionMenuData) {
      return JSON.parse(sessionMenuData);
    }
    return null;
  }

  isLoggedIn() {
    //let sessionData = localStorage.getItem('_user_session');        
    let sessionData = this.cookieService.get("_user_session");
    //console.log('sessionDataa-->'+JSON.stringify(this.cookieService.get("_user_session")));
    if (sessionData) {
      this.loggedIn = true;
      return true;
    }else{
      this.loggedIn = false;
      return false;
    }

  }

  isLoggedInOLD() {
    return this.authService.validateRefreshToken();
  }

}
