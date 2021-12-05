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

  get cart$(): Observable<Product[] | null> {
    return this.cart.asObservable();
  }

  isInCartById(id: string | undefined): boolean {
    const products = this.products.filter((product) => product.id === id);
    if (products.length === 0) {
      return false;
    }

    return true;
  }

  addProductToCart(product: Product) {
    product.isInCart = true;
    this.products.push(product);
    this.cart.next(this.products);
  }

  removeProductFromCart(product: Product) {
    product.isInCart = false;
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
