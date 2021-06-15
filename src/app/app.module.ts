import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { OnlyOddComponent } from './only-odd/only-odd.component';
import { PersonComponent } from './person/person.component';
import {CityService} from './services/city.service';
import {PincodeService} from './services/pincode.service';
import { CityComponent } from './city/city.component';
import { PincodeComponent } from './pincode/pincode.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { SellerComponent } from './seller/seller.component';
import {FormsModule} from '@angular/forms';
import { PaginaterComponent } from './paginater/paginater.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerRegistrationFormComponent } from './customer-registration-form/customer-registration-form.component';
import { GroceryProductComponent } from './grocery-product/grocery-product.component';
import { ProductComponent } from './product/product.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { AuthIntercepter } from './services/auth.intercepter';
import { LogoutComponent } from './logout/logout.component';
import { CartItemComponent } from './cart-item/cart-item.component';
import { TestComponent } from './test/test.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopComponent } from './shop/shop.component';
import { DetailsComponent } from './details/details.component';
import { ProfileComponent } from './profile/profile.component';
import { WishListComponent } from './wish-list/wish-list.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShopService } from './services/shop.service';
import { ReviewComponent } from './review/review.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { SellerOrderComponent } from './seller-order/seller-order.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { ProductManagerComponent } from './product-manager/product-manager.component';
import { SalesGraphComponent } from './sales-graph/sales-graph.component';
import { SearchProductComponent } from './search-product/search-product.component';

const appRoutes:Routes = [{path: '',component: HomeComponent}, 
                          {path: "login", component: LoginComponent}, 
                          {path: 'city',component: CityComponent, canActivate: [AuthGuard]}, 
                          {path: 'pincode', component: PincodeComponent, canActivate: [AuthGuard]},
                          {path: 'category', component: CategoryComponent},
                          {path: 'category/name/:name', component: CategoryComponent},
                          {path: 'subcategory', component: SubcategoryComponent}, 
                          {path: 'customer',component: CustomerComponent, canActivate: [AuthGuard]},
                          {path: 'customer-reg', component: CustomerRegistrationFormComponent},
                          {path: 'product', component: ProductComponent},
                          {path: 'logout', component: LogoutComponent},
                          {path: 'cart-items', component: CartItemComponent},
                          {path: 'test' , component: TestComponent},
                          {path: 'shop', component: ShopComponent},
                          {path: 'details/:productId',component: DetailsComponent},
                          {path:  'home', component: HomeComponent},
                          {path: 'checkout', component: CheckoutComponent},
                          {path: 'review/:productId', component: ReviewComponent},
                          {path: 'my-orders', component: MyOrdersComponent},
                          {path: 'order-details/:orderId', component: OrderDetailComponent},
                          {path: 'seller-login', component : SellerLoginComponent},
                          {path: 'seller-order', component: SellerOrderComponent},
                          {path: 'manage-product', component: ProductManagerComponent},
                          {path: 'sales-graph', component: SalesGraphComponent},
                          {path : 'search/:query',component : SearchProductComponent}
                          ];

@NgModule({
  declarations: [
    AppComponent,
    OnlyOddComponent,
    PersonComponent,
    CityComponent,
    PincodeComponent,
    CategoryComponent,
    SubcategoryComponent,
    SellerComponent,
    PaginaterComponent,
    CustomerComponent,
    CustomerRegistrationFormComponent,
    GroceryProductComponent,
    ProductComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    CartItemComponent,
    TestComponent,
    FooterComponent,
    NavbarComponent,
    ShopComponent,
    DetailsComponent,
    ProfileComponent,
    WishListComponent,
    CheckoutComponent,
    ReviewComponent,
    MyOrdersComponent,
    OrderDetailComponent,
    SellerOrderComponent,
    SellerLoginComponent,
    ProductManagerComponent,
    SalesGraphComponent,
    SearchProductComponent

  ],
  imports: [
    BrowserModule,FormsModule, HttpClientModule,RouterModule.forRoot(appRoutes)
  ],
  providers: [CityService, PincodeService, ShopService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthIntercepter,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
