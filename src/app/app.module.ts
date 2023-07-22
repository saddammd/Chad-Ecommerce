import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductsService } from './services/products.service';
import { Routes, RouterModule } from '@angular/router';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const routes: Routes = [

  { path: 'products/product/:id', component: ProductDetailsComponent},
  { path: 'search/:value', component: ProductsComponent },
  { path: 'category/:id', component: ProductsComponent },
  { path: 'category', component: ProductsComponent },
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },

];

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    SideMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    ShoppingCartComponent,
  ],
    
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],

  exports: [
    RouterModule,
  ],

  providers: [ProductsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
