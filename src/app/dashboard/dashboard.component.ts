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
  public recommendations :  any[]
  constructor(
    private _sharedService: SharedService,
    private _dashboardService: DashboardService
  ) {
    this.categories = ['Laptop', 'Tablet', 'Book'];
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
        const [recom, products] = response;
        this.inventoryItems = products.data;
        this.recommendations = recom.data;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  ngOnChanges() {
    console.log('dashboard changed: ', this.cartItems);
  }
  // ngDoCheck() {
  //   console.log('dashboard changed: ', this.cartItems);
  // }
  inc() {
    this._sharedService.setCartItems({ name: 'a' });
  }
  addToCart(e) {
    console.log('in add to cart of Dashboard', e);
    const itemIndex = this.inventoryItems.findIndex((a) => a.id === e.id);
    console.log('finding item : ', itemIndex);
    const item = { ...this.inventoryItems[itemIndex], added: true };
    this.inventoryItems[itemIndex] = item;
    this._sharedService.setCartItems(item);
  }
  removeFromCart(e) {
    const itemIndex = this.inventoryItems.findIndex((a) => a.id === e.id);
    const item = { ...this.inventoryItems[itemIndex], added: false };
    this.inventoryItems[itemIndex] = item;
    this._sharedService.removeCartItems(e);
  }
}
