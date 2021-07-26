import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { SharedService } from '../shared/shared.service';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component'
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public cartItems: any[] = [];
  public termnC: boolean;
  constructor(private _sharedService: SharedService,private _dialog: MatDialog) {
    this.termnC = false;
    this.cartItems = this._sharedService.getCartItems();
    this._sharedService.cartItemsVisibilityChange.subscribe(value => {
      console.log('value changed', value);
      this.cartItems = [...value];
    })
   }

  ngOnInit(): void {
  }
  removeFromCart(e) {
    this._sharedService.removeCartItems(e);
  }

  submit(): void {
    const dialogRef = this._dialog.open(NotificationModalComponent, {
      width: '350px',
      data: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
