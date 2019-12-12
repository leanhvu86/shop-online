import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';
import {Product} from '../model/product';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {post} from 'selenium-webdriver/http';
import {Order} from '../model/order';
import {Md5} from 'ts-md5';
import {OrderDetail} from '../model/orderDetail';
// import { Products } from './products';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class OrderService {
  orders: Order [] = [];
  orderDetails: OrderDetail [] = [];
  private orderUrl = '/api/orders';
  private orderDetailUrl = '/api/orderDetails';

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`OrđerService: ${message}`);
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

  getOrders = (): Observable<Order[]> => {
    console.log(localStorage.getItem('currentUser'));

    return this.http.get<Order[]>(this.orderUrl)
      .pipe(
        tap(_ => this.log('fetched orders')),
        catchError(this.handleError<Order[]>('getOrders', []))
      );
  };

  getOrderDetail = (): Observable<OrderDetail[]> => {
    console.log(localStorage.getItem('currentUser'));

    return this.http.get<OrderDetail[]>(this.orderDetailUrl)
      .pipe(
        tap(_ => this.log('fetched orderDetails')),
        catchError(this.handleError<OrderDetail[]>('getOrderDetails', []))
      );
  };


  getOrder = (id: number): Observable<Order> => {
    const url = `${this.orderUrl}/${id}`;
    return this.http.get<Order>(url).pipe(
      tap(_ => this.log(`fetched order id=${id}`)),
      catchError(this.handleError<Order>(`getOrder id=${id}`))
    );
  };

  addOrder(order: Order): Observable<Order> {
    console.log(order);
    return this.http.post<Order>(this.orderUrl, order, httpOptions).pipe(
      tap((newOrder: Order) => this.log(`added order w/ id=${newOrder.id}`)),
      catchError(this.handleError<Order>('addOrder')));
  }

  addOrderDetail(orderDetail: OrderDetail): Observable<OrderDetail> {
    console.log(orderDetail);
    return this.http.post<OrderDetail>(this.orderDetailUrl, orderDetail, httpOptions).pipe(
      tap((newOrderDetail: OrderDetail) => this.log(`added orderDetail w/ id=${newOrderDetail.id}`)),
      catchError(this.handleError<OrderDetail>('addOrderDetail')));
  }

  getOrderByMd5 = (md5: string): Order => {
    this.getOrders().subscribe(orders => this.orders = orders);
    let order: Order;
    this.orders = this.orders.filter(order => order.md5 == md5);
    console.log(this.orders);
    if (this.orders.length) {
      order = this.orders[0];
    } else {
      order = new Order();
    }
    return order;
  };

  getOrderDetailByOrderId = (orderId: string): OrderDetail [] => {
    this.getOrderDetail().subscribe(orderDetails => this.orderDetails = orderDetails);
    this.orderDetails = this.orderDetails.filter(orderDetail => orderDetail.orderId == orderId);
    return this.orderDetails;
  };
  updateOrder = (order: Order): Observable<any> => this.http.put(this.orderUrl, order, httpOptions).pipe(
    tap(_ => this.log(`updated order id=${order.id}`)),
    catchError(this.handleError<any>('updateOrder'))
  );
}
