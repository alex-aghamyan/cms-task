import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/core/models/product.model';
import { ProductInfoService } from '../../services/product-info.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addProductToCart: EventEmitter<Product> =
    new EventEmitter<Product>();
  @Output() removeProductFromCart: EventEmitter<Product> =
    new EventEmitter<Product>();

  constructor(private productInfoService: ProductInfoService) {}

  openProduct() {
    this.productInfoService.passProduct(this.product);
  }

  addToCart() {
    this.addProductToCart.emit(this.product);
  }

  removeFromCart() {
    this.removeProductFromCart.emit(this.product);
  }
}
