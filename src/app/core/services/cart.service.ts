import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private products: Product[] = [];
  private cart: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>(
    this.products
  );

  constructor() {}

  get cart$(): Observable<Product[] | null> {
    return this.cart.asObservable();
  }

  addProductToCart(product: Product) {
    this.products.push(product);
    this.cart.next(this.products);
  }

  removeProductFromCart(product: Product) {
    this.products = this.products.filter((item) => item.id !== product.id);
    this.cart.next(this.products);
  }

  totalPrice(): number {
    let prices = this.products.map((product) => {
      return product.price;
    });
    return prices.reduce(
      (previousValue, currentValue) => previousValue + currentValue
    );
  }
}
