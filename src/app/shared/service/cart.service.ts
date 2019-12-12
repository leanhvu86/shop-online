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

export class CartService {
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

  addProduct = (cart: Cart): Observable<Cart> =>{
    console.log("thêm giỏ hàng");
    return  this.http.post<Cart>(this.cartUrl, cart, httpOptions).pipe(
      tap((newCart: Cart) => this.log(`added cart w/ id=${newCart.id}`)),
      catchError(this.handleError<Cart>('addCart'))
    );
  };

  getCarts = (): Observable<Cart[]> => {
    console.log('load sp');

    return this.http.get<Cart[]>(this.cartUrl)
      .pipe(
        tap(_ => this.log('fetched carts')),
        catchError(this.handleError<Cart[]>('getCarts', []))
      );
  };


  updateCart = (cart: Cart): Observable<any> => this.http.put(this.cartUrl, cart, httpOptions).pipe(
    tap(_ => this.log(`updated cart id=${cart.id}`)),
    catchError(this.handleError<any>('updateCart'))
  );

  addmore = async cart => {
    this.totalCart = this.totalCart + cart.price;
    const index = this.carts.findIndex((e) => e.id === cart.id);
    this.count++;
    if (index === -1) {
      this.addProduct(cart)
        .subscribe(cart => {
          this.carts.push(cart);
        });
    } else {
      cart.quantity = cart.quantity += 1;
      this.updateCart(cart)
        .subscribe();
    }
    this.loadCart();
  };

  remove = async cart => {
    this.totalCart = this.totalCart - cart.price;
    const index = this.carts.findIndex((e) => e.id === cart.id);
    if (this.count !== 0) {
      this.count--;
    }
    if (index === -1) {
      console.log('looi');
    } else {
      if (cart.quantity > 1) {
        cart.quantity = cart.quantity - 1;
        this.updateCart(cart)
          .subscribe();
      } else {
        // this.heroes = this.heroes.filter(h => h !== hero);
        this.deleteCart(cart).subscribe();

      }
    }
    this.loadCart();
  };

  deleteCart = (cart: Cart | number): Observable<Cart> => {
    const id = typeof cart === 'number' ? cart : cart.id;
    const url = `${this.cartUrl}/${id}`;

    return this.http.delete<Cart>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted cart id=${id}`)),
      catchError(this.handleError<Cart>('deleteCart'))
    );
  };

  loadCart = (): void => {
    this.getCarts()
      .subscribe(carts => {
        console.log(carts);
        this.carts = carts;
      });
  };

  refreshCart(){
    this.count=0;
    this.totalCart=0;
    this.carts= [];
  }
}
