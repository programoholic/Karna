import { Injectable  } from '@angular/core';
import { Subject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private cartItems: any[];
  cartItemsVisibilityChange: Subject<any[]> = new Subject<any[]>();
  constructor(private _snackbar: MatSnackBar) {
    const addedItems = window.localStorage.getItem('addedItem') || `[]`;
    this.cartItems = JSON.parse(addedItems) || [];
    this.cartItemsVisibilityChange.subscribe((value) => {
      this.cartItems = value
  });
  }
  public getCartItems(): any[] {
    return this.cartItems;
  }
  public setCartItems(item: any): void {
    const tempItem = [...this.cartItems, item];
    window.localStorage.setItem('addedItem', JSON.stringify(tempItem));
    this.cartItemsVisibilityChange.next(tempItem); 
    this._snackbar.open('Item added!','Ok', {
      duration: 2000,
      verticalPosition: 'bottom',
    });
    // this.cartItems.push(item);
  }
  removeCartItems(removedItem: any) {
    const tempItem = this.cartItems.filter(item => item.sku !== removedItem.sku);
    window.localStorage.setItem('addedItem', JSON.stringify(tempItem));
    this.cartItemsVisibilityChange.next(tempItem);
    this._snackbar.open('Item removed!','Ok', {
      duration: 2000,
      verticalPosition: 'bottom',
    });
  }
  public resetCartItems(): void {
    // this.cartItems = [];
    const tempItem = [];
    window.localStorage.setItem('addedItem', JSON.stringify(tempItem));
    this.cartItemsVisibilityChange.next(tempItem);

  }
}
