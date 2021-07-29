import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './core/material.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './core/app-route.module';
import { AppBarComponent } from './app-bar/app-bar.component';
import { AppFooterComponent } from './app-footer/app-footer.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { CardComponent } from './card/card.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { CheckoutComponent } from './checkout/checkout.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import { LoaderComponent } from './loader/loader.component';

// import { StoreModule } from '@ngrx/store';
// import { cartReducer } from './store/cart.reducer';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AppBarComponent,
    AppFooterComponent,
    CreateOrderComponent,
    ProductCartComponent,
    CardComponent,
    HomeComponent,
    TableComponent,
    CheckoutComponent,
    NotificationModalComponent,
    EmptyStateComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    IvyCarouselModule,
    NgxSkeletonLoaderModule.forRoot()
    // StoreModule.forRoot({ cart: cartReducer })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[NotificationModalComponent]
})
export class AppModule { }
