import { Component, OnInit,Input, Output,EventEmitter, DoCheck } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() product: any;
  @Input() inCart: any;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter() ;
  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges() {
    
    console.log('changed: ',this.inCart,this.product)
  }
  // ngDoCheck() {
    
  //   console.log('changed: ',this.inCart,this.product)
  // }

  addCart() {
    console.log('in add to cart of card');
    this.addToCart.emit(this.product)
  }
  removeCart() {
    this.removeFromCart.emit(this.product);
  }

}
