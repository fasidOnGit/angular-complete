import {HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request is on its way!');
    // TO modify request.
    const modeifiedReq = req.clone({ headers: req.headers.append('Auth', 'hash')});
    return next.handle(modeifiedReq)
      .pipe(
        // Response Interceptors here...
        tap(noMatterWhatObserveHereItsEvent => {
          console.log(noMatterWhatObserveHereItsEvent);
          if (noMatterWhatObserveHereItsEvent.type === HttpEventType.Response) {
            console.log('Response Arrived', noMatterWhatObserveHereItsEvent.body);
          }
        })
      );
  }

}
