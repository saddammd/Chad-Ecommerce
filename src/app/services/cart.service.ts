import { Injectable } from '@angular/core';
import { CartItem } from '../classes/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartitem: CartItem[] = []
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {

    let itemAlreadyExist: boolean = false;
    let existingCartItem: CartItem = undefined!;
    //Check if we already have the item in our cart
    for (let tempCartItem of this.cartitem) {

      //find the item in the cart based on the item id
      if (tempCartItem.id === theCartItem.id) {
        existingCartItem = tempCartItem;
        itemAlreadyExist = (existingCartItem != undefined);
        break;
      }
    }

    //check if we found it
    if (itemAlreadyExist) {
      existingCartItem.quantity++;
    }

    else {
      this.cartitem.push(theCartItem);
    }
this.calculateteTotal();
  }
  calculateteTotal() {
    let total_value: number = 0;
    let total_quantity: number = 0
    for(let tempvalue of this.cartitem){
    total_value +=  tempvalue.quantity * tempvalue.unit_price;
    total_quantity += tempvalue.quantity;
    }

    //publis the value event

    this.totalPrice.next(total_value);
    this.totalQuantity.next(total_quantity);

  }
  
  }
