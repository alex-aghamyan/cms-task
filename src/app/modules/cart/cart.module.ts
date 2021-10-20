import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartPageComponent } from './page/cart-page.component';
import { ProductItemComponent } from './components/product-item/product-item.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [CartPageComponent, ProductItemComponent],
  imports: [CommonModule, CartRoutingModule, MatCardModule, MatButtonModule],
})
export class CartModule {}
