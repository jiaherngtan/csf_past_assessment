// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Observable } from "rxjs";
import { OrdersComponent } from "./components/orders.component";
import { Order } from "./models";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private httpClient: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(model: Order): Promise<Order> {
    // const formData = new FormData()
    // formData.set('name', form['name'])
    // formData.set('email', form['email'])
    // formData.set('size', form['size'])
    // formData.set('thick', form['base'])
    // formData.set('sauce', form['sauce'])
    // formData.set('toppings', form['toppings'])
    // formData.set('comments', form['comments'])
    // console.info('>>> form data: ', formData)
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return firstValueFrom(
      this.httpClient.post<Order>('/api/order', model, { headers: headers })
    )
  }

  createOrderObs(model: Order): Observable<any> {
    const headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
    return this.httpClient.post<any>('api/order', model, { headers: headers })
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string): Promise<Order[]> {
    return firstValueFrom(
      this.httpClient.get<Order[]>(`/api/order/${email}/all`)
    )
  }

}
