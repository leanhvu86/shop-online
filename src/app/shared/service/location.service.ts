import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {post} from 'selenium-webdriver/http';
import {Province} from '../model/province';
import {District} from '../model/district';
import {Ward} from '../model/ward';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class LocationService {
  private provinceUrl = '/api/provinces';
  private districtUrl = 'api/districts';
  private wardUrl = 'api/wards';
  provinces: Province[];

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`LocationService: ${message}`);
  }

  /**
   * Bắt hoạt động http fail.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProvinces = (): Observable<Province[]> => {
    console.log('load tỉnh');
    return this.http.get<Province[]>(this.provinceUrl)
      .pipe(
        tap(_ => this.log('fetched provinces')),
        catchError(this.handleError<Province[]>('getProvinces', []))
      );
  };
   getDistrict(): Observable<District[]> {

     return this.http.get<District[]>(this.districtUrl)
       .pipe(
       tap(_ => this.log(`fetched districts`)),
       catchError(this.handleError<District[]>(`getDistricts`))
     );
   }

   getWards(): Observable<Ward[]> {
     return this.http.get<Ward[]>(this.wardUrl)
      .pipe(
       tap(_ => this.log(`fetched wards` )),
       catchError(this.handleError<Ward[]>(`getWards `))
     );
   }

}
