import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartItem } from 'src/app/classes/cart-item';
import { Products } from 'src/app/classes/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductDetailsService } from 'src/app/services/product-details.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetail!:Products;
  error: string = '';
  cartItemList : CartItem = undefined!;

  constructor(private route:ActivatedRoute,
              private productDetails: ProductDetailsService,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(()=>{
      this.getProductdetails();
    }
    )

  }

  getProductdetails(){
    const hasvalue:boolean = this.route.snapshot.paramMap.has(`id`);
    if(hasvalue){
    const id = this.route.snapshot.paramMap.get('id')!;
    return this.productDetails.getProduct(+id).subscribe(
      data=>{
        this.productDetail = data;
        console.log(this.productDetail.name)
      }
    )
    }
    else{
      return "hello";
    }
  }

    addtoCart(productDetail:Products ){
    
      this.cartItemList = new CartItem(productDetail);
      this.cartService.addToCart(this.cartItemList);

    }
}
    

    
