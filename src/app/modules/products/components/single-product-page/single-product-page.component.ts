import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { GetProductsService } from 'src/app/core/services/get-products.service';

@Component({
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss'],
})
export class SingleProductPageComponent implements OnInit {
  product$: Observable<Product> = EMPTY;

  constructor(
    private cartService: CartService,
    private productsService: GetProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.product$ = this.route.params.pipe(
      switchMap((param) => {
        return this.productsService.getProductsById(param.id);
      }),
      map((product) => {
        const isInCart = this.cartService.isInCartById(product.id);
        return { ...product, isInCart: isInCart };
      })
    );
  }

  addProductToCart(product: Product) {
    this.cartService.addProductToCart(product);
  }

  removeProductFromCart(product: Product) {
    this.cartService.removeProductFromCart(product);
  }
}
