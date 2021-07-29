import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _http: HttpClient) { }

  createOrder(orderDetails: any): Observable<any> {
     return this._http.post('/api/v1/orders/', orderDetails);
  }
}
