import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule} from './shared/shared.module';
import {MatTooltipModule} from '@angular/material/tooltip';

import { MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import {GlobalSettings} from './shared/settings';
import { CookieModule } from 'ngx-cookie';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,

    MatSlideToggleModule,
    MatTooltipModule,

    MatAutocompleteModule,
    MatSnackBarModule,
    CookieModule.forRoot(),
    

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(GlobalSettings.clientId)
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent],
  exports: [
    MatTooltipModule
  ]
})
export class AppModule { }
