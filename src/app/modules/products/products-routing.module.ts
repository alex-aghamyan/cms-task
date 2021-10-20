import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleProductPageComponent } from './components/single-product-page/single-product-page.component';
import { ProductsPageComponent } from './page/products-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsPageComponent,
    children: [
      {
        path: ':category',
      },
    ],
  },
  {
    path: 'product/:name',
    component: SingleProductPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
