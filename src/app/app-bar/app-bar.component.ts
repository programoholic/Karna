import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css']
})
export class AppBarComponent implements OnInit {
  public avatar;
  public cartItems: any[];
  constructor(private _sharedService: SharedService) {
    this.cartItems = this._sharedService.getCartItems();
    console.log('finalyy got', this.cartItems);
    this._sharedService.cartItemsVisibilityChange.subscribe(value => {
      console.log('value changed', value);
      this.cartItems = [...value];
    })
  }

  ngOnInit(): void {
  }
  performAction() { }

  logout() {
    window.location.replace('/api/v1/logout');
  }
}
