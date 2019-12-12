import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Product} from '../model/product';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {post} from 'selenium-webdriver/http';
// import { Products } from './products';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class ProductService {
  carts: Cart [] = [];
  private cartUrl = '/api/carts';
  private productUrl = '/api/products';
  count = 0;
  totalCart = 0;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
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

  getProducts = (): Observable<Product[]> => {
    console.log('load sp');
    return this.http.get<Product[]>(this.productUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError<Product[]>('getProducts', []))
      );
  };

  getProduct = (id: number): Observable<Product> => {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  };

  addProduct = (product: Product): Observable<Product> => this.http.post<Product>(this.productUrl, product, httpOptions).pipe(
    tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
    catchError(this.handleError<Product>('addProduct'))
  );
  updateProduct = (product: Product): Observable<any> => this.http.put(this.productUrl, product, httpOptions).pipe(
    tap(_ => this.log(`updated product id=${product.id}`)),
    catchError(this.handleError<any>('updateProduct'))
  );

  //     this.addProduct(cart)
  //       .subscribe(cart => {
  //         this.carts.push(cart);
  //       });
  deleteProduct = (product: Product | number): Observable<Product> => {
    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productUrl}/${id}`;
    console.log("xóa sp : "+ product);
    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  };
  //
  // loadCart = (): void => {
  //   this.getCarts()
  //     .subscribe(carts => {
  //       console.log(carts);
  //       this.carts = carts;
  //     });
  // };

}
