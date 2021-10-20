import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductInfoService } from '../../services/product-info.service';

@Component({
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss'],
})
export class SingleProductPageComponent implements OnInit {
  $productInfo!: Observable<Product | null>;

  constructor(
    private productInfoService: ProductInfoService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.$productInfo = this.productInfoService.$productInfo;
  }

  addProductToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }
}
