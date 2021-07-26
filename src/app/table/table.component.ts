import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {  
  @Input() product: any;
  @Input() inCart: any;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter() ;
  constructor() {
    
  }

  ngOnInit(): void {
  }
  addCart() {
    console.log('in add to cart of card');
    this.addToCart.emit(this.product)
  }
  removeCart() {
    this.removeFromCart.emit(this.product);
  }
}
