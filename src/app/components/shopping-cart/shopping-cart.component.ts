import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {


  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    this.updateCartStatus();
  }
  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data=>
      this.totalPrice = data);

      this.cartService.totalQuantity.subscribe(data=>
        this.totalQuantity = data);
  
  }

}
