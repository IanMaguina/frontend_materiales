import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError , BehaviorSubject ,from } from 'rxjs';
import { take, filter, catchError , switchMap, finalize} from 'rxjs/operators';
import { AuthService} from '../servicios/token.service';
import { AutenticacionService } from '../servicios/autenticacion.service';
import { Messages } from '../shared/messages';
import { GlobalSettings} from '../shared/settings';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    isRefreshingToken: boolean = false;
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

    constructor(
            private autenticacionService: AutenticacionService,
            private authService:AuthService
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("url="+request.url);
        return next.handle(this.validateRequest(request)).pipe(catchError(err => {            
            
            if (   err.status === 401 && 
                   request.url.indexOf('/token')<0 && 
                   request.url.indexOf('/account')<0 &&
                   request.url.indexOf(GlobalSettings.BASE_API_URL)>=0
                   ) {
                return this.handle401Error(request,next);
            }else{
                console.log("error="+ JSON.stringify(err));
                let message = Messages.error.MSG_ERROR_SERVER;
                if (err.error && err.error.message){
                    message = err.error.message;
                }
                const error = { status:err.status,message:message};                
                return throwError(error);    
            }
           
        }))
    }

    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        console.log("req method="+req.method);
        //let contentType = 'application/x-www-form-urlencoded; charset=utf-8';
        //if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE'){
        //    contentType = 'application/json';
        //}
        console.log("token-->"+token);
        let newHeaders = req.headers.append("Authorization",'Bearer ' + token);

        return req.clone({ headers: newHeaders});
        
    }

    validateRequest(req:HttpRequest<any>){
        if (   req.url.indexOf(GlobalSettings.BASE_API_URL)<0 ||
               req.url.indexOf("/token")>=0 || 
               req.url.indexOf("/account")>=0 
            ){
            console.log("not adding token to request...");    
            return req;        
        }else{            
            console.log("adding access token to request...");
            return this.addToken(req,this.authService.getAccessToken());
        }

    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler){

        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
            this.tokenSubject.next("");

            return from (this.authService.obtainRefreshToken()).pipe(
                switchMap((newToken: string) => {
                    if (newToken) {
                        console.log("new  token="+JSON.stringify(newToken));
                        this.tokenSubject.next(newToken);
                        return next.handle(this.addToken(req, newToken));
                    }

                    // If we don't get a new token, we are in trouble so logout.
                    return this.logout("error when getting refresh token...empty token");
                }),
                catchError(error => {
                    // If there is an exception calling 'refreshToken', bad news so logout.
                    return this.logout(error);
                }),
                finalize(() => {
                    this.isRefreshingToken = false;
                }),);            
           
        } else {
            return this.tokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(token => {
                    return next.handle(this.addToken(req, token));
                }),);
        }

    }

    logout(error:any){
        this.autenticacionService.signout();
        location.reload(true);

        return throwError(error);
    }
}