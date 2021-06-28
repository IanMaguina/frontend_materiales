import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(
    public loaderService:LoaderService,
    ) { }


intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
  setTimeout(() => {
    this.loaderService.isLoading.next(true);
  });

  

   return next.handle(req).pipe(
     finalize(
       ()=> {
          this.loaderService.isLoading.next(false);
          
       }
     )
   )
 

}
   
}
