import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../classes/products';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  private baseUrl = "http://localhost:7000/ecommerce/api/v1/products/product/"

  constructor(private http: HttpClient) { }

  getProduct(id:number):Observable<Products>{
    return this.http.get<Products>(this.baseUrl+`${id}`);
  }
}
