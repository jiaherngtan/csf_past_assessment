import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  email = ''
  params$!: Subscription
  orders: Order[] | null = null

  constructor(
    private activatedRoute: ActivatedRoute,
    private pizzaService: PizzaService
  ) { }

  ngOnInit(): void {
    this.params$ = this.activatedRoute.params.subscribe(
      (params) => {
        this.email = params['email']
        this.pizzaService.getOrders(this.email)
          .then(result => {
            this.orders = result
          })
          .catch(error => {
            console.error(">>> error: ", error)
          })
      }
    )
  }

}
