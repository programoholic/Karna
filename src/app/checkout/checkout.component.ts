import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { LoggedInAuthGuard } from '../core/loggedIn-auth-guard';
import { CheckoutService } from './checkout.service';
import {
  defaultCartPlaceholder,
  successCartPlaceholder,
} from '../common/constants';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  public cartItems: any[] = [];
  public termnC: boolean;
  public loading: boolean;
  public placeHolder: any;
  public productSummary: any;
  constructor(
    private _sharedService: SharedService,
    private _dialog: MatDialog,
    private _authService: LoggedInAuthGuard,
    private _checkoutService: CheckoutService
  ) {
    this.termnC = false;
    this.loading = false;
    this.placeHolder = defaultCartPlaceholder;
    this.cartItems = this._sharedService.getCartItems();
    console.log('cart', this.cartItems);
    this.calculateSummary(this.cartItems);
    this._sharedService.cartItemsVisibilityChange.subscribe((value) => {
      console.log('value changed', value);
      this.cartItems = [...value];
      this.calculateSummary(this.cartItems);
    });
  }

  ngOnInit(): void {}
  removeFromCart(e) {
    this._sharedService.removeCartItems(e);
  }

  submit(): void {
    this.loading = true;
    const user = this._authService.getUserDetails();
    console.log(user);
    const payload = {
      rollId: user.rollId,
      items: this.cartItems,
    };
    this._checkoutService.createOrder(payload).subscribe({
      next: (data) => {
        console.log('success: ', data);
        this.showConfirm(true, 'Request Submitted!');
      },
      error: (err) => {
        console.log('failure: ', err);
        this.showConfirm(false, err.error.message);
      },
      complete: () => {},
    });
  }

  showConfirm(isSuccessFull: boolean, message: string) {
    this.loading = false;
    this.placeHolder = { ...successCartPlaceholder };
    const dialogRef = this._dialog.open(NotificationModalComponent, {
      width: '300px',
      data: { error: !isSuccessFull, message },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (isSuccessFull) {
        this._sharedService.resetCartItems();
      }
    });
  }

  calculateSummary(cartItems: any[]) {
    const groupedItems = this.groupBy(cartItems, 'category');
    const summary = {
      books:  groupedItems["Books"] ? groupedItems["Books"].length : 0,
      tablet: groupedItems["Tablets"]?groupedItems["Tablets"].length:0,
      laptop: groupedItems["Laptops"]?groupedItems["Laptops"].length:0,
    }
    this.productSummary = summary;
  }
  groupBy(items: any[], key: string) {
    const groupedEntities = {};
    items.forEach((item) => {
      const keyId = item[key];
      groupedEntities[keyId] = groupedEntities[keyId]
        ? [...groupedEntities[keyId], item]
        : [item];
    });
    return groupedEntities;
  }

}
