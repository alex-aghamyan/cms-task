import { Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss'],
})
export class CartPageComponent implements OnInit {
  $products: Observable<Product[] | null> = EMPTY;
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.$products = this.cartService.$cart;
    this.totalPrice = this.cartService.totalPrice();
  }
}
