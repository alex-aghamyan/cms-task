import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminPageComponent } from './page/admin-page.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NewsComponent } from './components/news/news.component';
import { EditProductDialogComponent } from './components/edit-product-dialog/edit-product-dialog.component';
import { EditCategoryDialogComponent } from './components/edit-category-dialog/edit-category-dialog.component';
import { EditNewsDialogComponent } from './components/edit-news-dialog/edit-news-dialog.component';

import { CrudProductsService } from './services/crud-products.service';
import { CrudCategoriesService } from './services/crud-categories.service';
import { CrudNewsService } from './services/crud-news.service';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AdminPageComponent,
    ProductsComponent,
    CategoriesComponent,
    NewsComponent,
    ConfirmationDialogComponent,
    EditProductDialogComponent,
    EditCategoryDialogComponent,
    EditNewsDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
  ],
  providers: [CrudProductsService, CrudCategoriesService, CrudNewsService],
})
export class AdminModule {}
