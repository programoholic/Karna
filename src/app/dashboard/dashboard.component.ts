import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnChanges {
  public inventoryItems: any[];
  public loading: boolean;
  public cartItems: any[];
  public categories: string[];
  public recommendations: any[];
  public notFound: string;
  constructor(
    private _sharedService: SharedService,
    private _dashboardService: DashboardService
  ) {
    this.categories = ['Laptop', 'Tablet', 'Book'];
    this.notFound = 'Start exploring to see recommendations!';
    this.inventoryItems = [];
    this.recommendations = [];
    this.cartItems = this._sharedService.getCartItems();
    this._sharedService.cartItemsVisibilityChange.subscribe((value) => {
      console.log('value changed', value);
      this.cartItems = [...value];
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this._dashboardService.getInventoryItems().subscribe({
      error: (err) => {},
      next: (response) => {
        const [products, recom] = response;
        console.log({ recom, products });
        const mappedRecom = recom.data.map((item) => {
          const isAddedinCart = this.cartItems.find(
            (cartItem) => cartItem.sku === item.sku
          );
          return { ...item, added: isAddedinCart ? true : false };
        });
        const mappedProducts = products.data.map((item) => {
          const isAddedinCart = this.cartItems.find(
            (cartItem) => cartItem.sku === item.sku
          );
          return { ...item, added: isAddedinCart ? true : false };
        });
        this.inventoryItems = [...mappedProducts];
        this.recommendations = [...mappedRecom];
        console.log(this.inventoryItems);
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  ngOnChanges() {
    console.log('dashboard changed: ', this.cartItems);
  }
  inc() {
    this._sharedService.setCartItems({ name: 'a' });
  }
  addToCart(e, source) {
    if (this.cartItems.length >= 5) {
      alert('Max 5 items are allowed!');
      return;
    }
    console.log('in add to cart of Dashboard', e);
    let item;
    if (source === 'recommendation') {
      const itemIndex = this.recommendations.findIndex((a) => a.sku === e.sku);
      console.log('finding item : ', itemIndex);
      item = { ...this.recommendations[itemIndex], added: true };
      this.recommendations[itemIndex] = item;
    } else {
      const itemIndex = this.inventoryItems.findIndex((a) => a.sku === e.sku);
      console.log('finding item : ', itemIndex);
      item = { ...this.inventoryItems[itemIndex], added: true };
      this.inventoryItems[itemIndex] = item;
    }
    this._sharedService.setCartItems(item);
  }
  removeFromCart(e: any, source: string) {
    let item;
    if (source === 'table') {
      const itemIndex = this.inventoryItems.findIndex((a) => a.sku === e.sku);
      item = { ...this.inventoryItems[itemIndex], added: false };
      this.inventoryItems[itemIndex] = item;
    } else {
      const itemIndex = this.recommendations.findIndex((a) => a.sku === e.sku);
      item = { ...this.recommendations[itemIndex], added: false };
      this.recommendations[itemIndex] = item;
    }
    this._sharedService.removeCartItems(e);
  }
}
