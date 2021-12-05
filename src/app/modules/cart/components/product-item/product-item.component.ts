import { Component, Input } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  removeProductFromCart() {
    this.cartService.removeProductFromCart(this.product);
  }
}
