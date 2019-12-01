import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataAccess {
  constructor(
    private http: HttpClient
  ) {
  }

  getData(): Observable<any> {
    return this.http.get<any>('https://reqres.in/api/users' , {
      headers: new HttpHeaders({'Custom-headers': 'Hello Custom!'}),
      params: new HttpParams().set('id', '2')
    })
      .pipe(
        map(transformIfYouNeedTo => [].concat(transformIfYouNeedTo.data)),
        tap(interceptWithChangingStream => console.log(interceptWithChangingStream)),
        catchError(errorRes => throwError(errorRes))
      );
  }

  getDataByParams(): Observable<any> {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('id', '2');
    searchParams = searchParams.append('email', 'fasid@gmail.com');
    return this.http.get<any>('https://reqres.in/api/users' , {
      headers: new HttpHeaders({'Custom-headers': 'Hello Custom!'}),
      params: searchParams
    })
      .pipe(
        map(transformIfYouNeedTo => [].concat(transformIfYouNeedTo.data)),
        tap(interceptWithChangingStream => console.log(interceptWithChangingStream)),
        catchError(errorRes => throwError(errorRes))
      );
  }

  getDataFullResponse(): Observable<any> {
    return this.http.get<any>('https://reqres.in/api/users' , {
      // 'body' | 'events' | 'response'
      observe: 'events'
    }).pipe(
      tap(x => console.log(x))
    );
  }
}
