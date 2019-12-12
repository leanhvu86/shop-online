import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';
import {post} from 'selenium-webdriver/http';
import {Customer} from '../model/customer';
import {Cart} from '../model/cart';
// import { Products } from './products';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root',
})

export class CustomerService {
  customers: Customer [] = [];
  private customerUrl = '/api/customers';
  customer: Customer;

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
  ) {
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`CustomerService: ${message}`);
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

  getCustomers = (): Observable<Customer[]> => {
    console.log(localStorage.getItem('currentUser'));

    return this.http.get<Customer[]>(this.customerUrl)
      .pipe(
        tap(_ => this.log('fetched customers')),
        catchError(this.handleError<Customer[]>('getCustomers', []))
      );
  };

  getCustomer = (id: number): Observable<Customer> => {
    const url = `${this.customerUrl}/${id}`;
    return this.http.get<Customer>(url).pipe(
      tap(_ => this.log(`fetched customer id=${id}`)),
      catchError(this.handleError<Customer>(`getCustomer id=${id}`))
    );
  };
  getCustomerByMd5 = (md5: string): Customer => {
    this.getCustomers().subscribe(customers => {
      console.log(customers);
      this.customers = customers
    });
    this.customers = this.customers.filter(customer => customer.md5 == md5);
    console.log(this.customers);
    if (this.customers.length) {
      this.customer = this.customers[0];

    } else {
      this.customer = new Customer();
    }
    return this.customer;
  };

  addCustomer = (customer: Customer): Observable<Customer> => {
    console.log('Lưu customer' + customer.md5);
    return this.http.post<Customer>(this.customerUrl, customer, httpOptions).pipe(
      tap((newCustomer: Customer) => this.log(`added customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<Customer>('addCustomer'))
    );
  };
  updateCustomer = (customer: Customer): Observable<any> => this.http.put(this.customerUrl, customer, httpOptions).pipe(
    tap(_ => this.log(`updated customer id=${customer.id}`)),
    catchError(this.handleError<any>('updateCustomer'))
  );
}
