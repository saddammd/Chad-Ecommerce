import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../classes/categories';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  url:string = 'http://localhost:7000/ecommerce/api/v1/category';

  constructor(private httpclient: HttpClient) { }

  public getCategories():Observable<Categories[]>{
    return this.httpclient.get<Categories[]>(this.url);
  }
}
