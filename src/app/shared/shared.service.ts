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
    this.cartItems = [];
    this.cartItemsVisibilityChange.subscribe((value) => {
      this.cartItems = value
  });
  }
  public getCartItems(): any[] {
    return this.cartItems;
  }
  public setCartItems(item: any): void {
    const tempItem = [...this.cartItems, item];
    this.cartItemsVisibilityChange.next(tempItem);
    this._snackbar.open('Item added!','Ok', {
      duration: 2000,
      verticalPosition: 'top',
    });
    // this.cartItems.push(item);
  }
  removeCartItems(removedItem: any) {
    const tempItem = this.cartItems.filter(item => item.id !== removedItem.id);
    this.cartItemsVisibilityChange.next(tempItem);
    this._snackbar.open('Item removed!','Ok', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
  public resetCartItems(): void {
    // this.cartItems = [];
    const tempItem = [];
    this.cartItemsVisibilityChange.next(tempItem);

  }
}
