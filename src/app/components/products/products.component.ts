import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty } from 'rxjs';
import { productResponse } from 'src/app/classes/interfaces/product-response';
import { Page } from 'src/app/classes/interfaces/page';
import { Products } from 'src/app/classes/products';
import { ProductsService } from 'src/app/services/products.service';
import { CartItem } from 'src/app/classes/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  categoryId: number = 1;
  error: string = '';
  pageNumber: number = 0;
  pagination_button1: number = 1;
  pagination_button2: number = 2;
  pagination_button3: number = 3;
  pagination_active1: boolean = true;
  pagination_active2: boolean = false;
  pagination_active3: boolean = false;
  pagination_active4: boolean = false;
  productResponse!: productResponse<Page>;
  cartItemList: CartItem = undefined!;

  constructor(private productService: ProductsService,
              private routes: ActivatedRoute,
              private cartService: CartService) { }

  ngOnInit(): void {

  this.routes.paramMap.subscribe(()=>{
    this.loadProducts();
  }
  )
  }

  loadProducts(){

    const hasSearch: boolean = this.routes.snapshot.paramMap.has(`value`);
    if(hasSearch){
      const searchValue = this.routes.snapshot.paramMap.get(`value`)!;
    
    return this.productService.getSearchResult(searchValue).subscribe(data => 
      {
        this.productResponse = data;
        this.error = '';
      },
      (err)=>{
        if(err){
        this.error = err.error.message;  
        this.productResponse;
        }    
      }
    );
    
    }

    const hasId: boolean = this.routes.snapshot.paramMap.has(`id`);
    if(hasId){

      this.categoryId = +this.routes.snapshot.paramMap.get(`id`)!;
    }
    else{
      this.categoryId = 0;
    }
    return this.productService.getProductsList(this.categoryId).subscribe(data => 
      {
        this.productResponse = data;
        console.log("printing the value" +this.productResponse.data.Page.totalPages);
      });
  }

  selectPageSize(size:Event){
    let pageSize = (size.target as HTMLInputElement).value;
    this.productService.pageSize = Number(pageSize);
    this.routes.paramMap.subscribe(()=>{
      this.loadProducts();
      window.scrollTo(0, 0);
    }
    )
    
  }

  navigatetoPageNo(pageNumber: number){
      this.pageNumber = pageNumber;
      this.productService.pageNumber = this.pageNumber-1;
      window.scrollTo(0, 0);
      this.routes.paramMap.subscribe(()=>{
        this.loadProducts();
        this.setPaginationButtonValue();
      }
      )

    if(pageNumber == -1){
      this.pageNumber = this.pageNumber - 1;
      if(this.pageNumber>-1){
      this.productService.pageNumber = this.pageNumber;
      }
      window.scrollTo(0, 0);
      this.routes.paramMap.subscribe(()=>{
        this.loadProducts();
        
      }
      )
    }
  }
  setPaginationButtonValue(){

    if(this.pageNumber < this.productResponse.data.Page.totalPages - 1){
    if(this.pageNumber%3==0){
      this.pagination_button1 = this.pageNumber;
      this.pagination_active1 = true;
      this.pagination_active2 = false;
      this.pagination_active3 = false;
      this.pagination_active4 = false;
      this.pagination_button2 = this.pagination_button1 + 1;
      this.pagination_button3 = this.pagination_button2 + 1;
    }

    else if(this.isPrime(this.pageNumber)){
      this.pagination_button1 = this.pageNumber;
      this.pagination_active1 = true;
      this.pagination_active2 = false;
      this.pagination_active3 = false;
      this.pagination_active4 = false;
      this.pagination_button2 = this.pagination_button1 + 1;
      this.pagination_button3 = this.pagination_button2 + 1;

    }
    
  }
  else if(this.pageNumber === this.productResponse.data.Page.totalPages - 1){
    this.pagination_active1 = false;
    this.pagination_active2 = false;
    this.pagination_active3 = true;
    this.pagination_active4 = false;
    }
  }

 private isPrime(num: number):boolean{

   
   let flag: boolean = false;
   if(num > 3){
    for (let i = 2; i <= num / 2; ++i) {
      // condition for nonprime number
      if (num % i == 0) {
        flag = true;
        break;
      }
    }

    if (!flag)
    return true;  
    else
      return false;
  }
  return flag;
}

isActive1(){
  this.pagination_active1 = true;
  this.pagination_active2 = false;
  this.pagination_active3 = false;
  this.pagination_active4 = false;
}
isActive2(){
  if(this.pageNumber%3==0){
  this.pagination_active1 = true;
  this.pagination_active2 = false;
  this.pagination_active3 = false;
  this.pagination_active4 = false;
  }
  else if(this.isPrime(this.pageNumber)){
    this.pagination_active1 = true;
    this.pagination_active2 = false;
    this.pagination_active3 = false;
    this.pagination_active4 = false;
  }
  else{
  this.pagination_active1 = false;
  this.pagination_active2 = true;
  this.pagination_active3 = false;
  this.pagination_active4 = false;
}
}
isActive4(){
  this.pagination_active1 = false;
  this.pagination_active2 = false;
  this.pagination_active3 = false;
  this.pagination_active4 = true;

}

addToCart(productList: Products){

  this.cartItemList = new CartItem(productList)
  this.cartService.addToCart(this.cartItemList);


}

}
