import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from 'src/app/core/models/product.model';

@Injectable()
export class ProductInfoService {
  private productInfo: BehaviorSubject<Product | null> =
    new BehaviorSubject<Product | null>(null);

  get productInfo$(): Observable<Product | null> {
    return this.productInfo.asObservable();
  }

  passProduct(product: Product) {
    this.productInfo.next(product);
  }
}
