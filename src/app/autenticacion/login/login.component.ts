import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { RandomService } from 'src/app/servicios/random.service';

import { AutenticacionService } from 'src/app/servicios/autenticacion.service';





@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuarioLogueado: any = SocialUser;
  usuarioSocial: any = SocialUser;
  user: any = SocialUser;
  loggedIn: boolean = false;



  constructor(
    private socialAuthService: SocialAuthService,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {

  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {

      this.usuarioLogueado = user;
      if (this.usuarioLogueado) {
          this.router.navigate(['dashboard']);
      }
      //console.log("super arsa -->" + JSON.stringify(user));
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.autenticacionService.signInWithGoogle().then((data) => {
      //aqui hago el proceso
      //console.log('la data de loggeo : '+JSON.stringify(data));    
      this.usuarioSocial = data;
      if (data.id) {
        this.autenticacionService.loggedIn = true;
        this.router.navigate(['dashboard']);
      } else {
        this.autenticacionService.loggedIn = false;
      }

    })
    /*     this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then( (data) => {
          console.log('la data de loggeo : '+JSON.stringify(data));
          if(data.id){
            this.randomService.stateButton = true;
            this.router.navigate(['dashboard']);
          }else{
            this.randomService.stateButton = false;
          }
        });
     */
  }

  signOut(): void {
    this.socialAuthService.signOut();
    //this.randomService.stateButton = false;
  }


}
