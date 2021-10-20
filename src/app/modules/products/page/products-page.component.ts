import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { GetCategoriesService } from 'src/app/core/services/get-categories.service';
import { GetProductsService } from 'src/app/core/services/get-products.service';

@Component({
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss'],
})
export class ProductsPageComponent implements OnInit {
  products!: Observable<Product[]>;
  categories!: Observable<Category[]>;

  constructor(
    private productsService: GetProductsService,
    private categoriesService: GetCategoriesService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categories = this.categoriesService.getCategories();
    this.loadProducts(0);
  }

  loadProducts(index: number) {
    this.products = this.categoriesService.getCategories().pipe(
      switchMap((categories) => {
        this.router.navigate(['products', categories[index].link]);
        return this.productsService.getProductsByCategory(categories[index].id);
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
