import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsPageComponent } from './page/products-page.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SingleProductPageComponent } from './components/single-product-page/single-product-page.component';

import { ProductInfoService } from './services/product-info.service';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductCardComponent,
    SingleProductPageComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  providers: [ProductInfoService],
})
export class ProductsModule {}
