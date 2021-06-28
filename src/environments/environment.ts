// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { GlobalSettings } from "src/app/shared/settings";

// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    //    domain,
        //clientId:"68121155157-tkutj29srn3cbe4o2f8qpqhhgql2jqh9.apps.googleusercontent.com"
        clientId: GlobalSettings.CLIENT_KEY
        //redirectUri: window.location.origin,
       // audience,
      },  
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
