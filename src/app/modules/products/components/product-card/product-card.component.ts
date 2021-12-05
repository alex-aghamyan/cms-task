import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from 'src/app/core/models/product.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnDestroy {
  notifier: Subject<boolean> = new Subject();
  @Input() product!: Product;
  @Output() addProductToCart: EventEmitter<Product> =
    new EventEmitter<Product>();
  @Output() removeProductFromCart: EventEmitter<Product> =
    new EventEmitter<Product>();

  constructor(private router: Router, private route: ActivatedRoute) {}

  openProduct() {
    this.route.firstChild?.params
      .pipe(takeUntil(this.notifier))
      .subscribe((params) => {
        this.router.navigate([params.category, this.product.id], {
          relativeTo: this.route,
        });
      });
  }

  addToCart() {
    this.addProductToCart.emit(this.product);
  }

  removeFromCart() {
    this.removeProductFromCart.emit(this.product);
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }
}
