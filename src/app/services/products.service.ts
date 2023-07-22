import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Products } from '../classes/products';
import { productResponse } from '../classes/interfaces/product-response';
import { Page } from '../classes/interfaces/page';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Products[] = [];
  pageSize: Number = 10;
  pageNumber: Number = 0;

  private baseUrl = "http://localhost:7000/ecommerce/api/v1/products/"
 private defaultUrl = "http://localhost:7000/ecommerce/api/v1/products?"
 //private defaultUrl = "http://localhost:7000/ecommerce/api/v1/products/" 
 private searchUrl = "http://localhost:7000/ecommerce/api/v1/products/"
  
  constructor(private httpclient: HttpClient) { }

  getProductsList(categoryId:number): Observable<productResponse<Page>>{
    const categorysearchUrl = `${this.baseUrl}`+ `${categoryId}`;
    if(categoryId<1 && this.pageNumber == 0){
      return this.httpclient.get<productResponse<Page>>(this.defaultUrl+"pageSize="+this.pageSize);
    }
    if(categoryId<1 && +this.pageNumber>=1)
    {
      return this.httpclient.get<productResponse<Page>>(this.defaultUrl+"pageSize="+this.pageSize+"&pageNumber="+this.pageNumber);
    }
    else{
    return this.httpclient.get<productResponse<Page>>(categorysearchUrl);
    }
  }

  getSearchResult(searchValue:string):Observable<productResponse<Page>>{
    if(searchValue){
      return this.httpclient.get<productResponse<Page>>(this.baseUrl+"/search?search="+searchValue);
    }
    else return this.httpclient.get<productResponse<Page>>(this.defaultUrl+this.pageSize);
  }
}
