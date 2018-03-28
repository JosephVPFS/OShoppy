import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { LoginComponent } from './login/login.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { ProductsComponent } from './products/products.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { AuthService } from './auth.service';
import { AuthGaurd } from './auth-gaurd.service';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminAuthGaurd } from './admin-auth-gaurd.service';
import { UserService } from './user.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular5-data-table';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    LoginComponent,
    MyOrdersComponent,
    AdminOrdersComponent,
    AdminProductsComponent,
    ProductsComponent,
    BsNavbarComponent,
    OrderSuccessComponent,
    ProductFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {path:'', component: HomeComponent},
      {path:'login', component: LoginComponent},
      {path:'products', component: ProductsComponent},
      {path:'shopping-cart', component: ShoppingCartComponent},

      {path:'check-out', component: CheckOutComponent, canActivate:[AuthGaurd]},
      {path:'my/orders', component: MyOrdersComponent, canActivate:[AuthGaurd]},
      {path:'order-success', component: OrderSuccessComponent, canActivate:[AuthGaurd]},

      {path:'admin/orders', component: AdminOrdersComponent, canActivate:[AuthGaurd, AdminAuthGaurd]},
      {path:'admin/products/new', component: ProductFormComponent, canActivate:[AuthGaurd, AdminAuthGaurd]},
      {path:'admin/products/:id', component: ProductFormComponent, canActivate:[AuthGaurd, AdminAuthGaurd]},
      {path:'admin/products', component: AdminProductsComponent, canActivate:[AuthGaurd, AdminAuthGaurd]}
    ])
  ],
  providers: [AuthService,
              AuthGaurd,
              AdminAuthGaurd,
              UserService,
              CategoryService,
              ProductService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
