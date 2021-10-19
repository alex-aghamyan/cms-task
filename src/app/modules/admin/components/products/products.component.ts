import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { CrudCategoriesService } from '../../services/crud-categories.service';
import { CrudProductsService } from '../../services/crud-products.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditProductDialogComponent } from '../edit-product-dialog/edit-product-dialog.component';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'categoryID',
    'photoURL',
    'description',
    'price',
    'Actions',
  ];
  dataSource!: MatTableDataSource<Product>;
  filterControl!: FormControl;
  addProductForm!: FormGroup;
  subscription!: Subscription;
  categories: Observable<Category[]> = EMPTY;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private crud: CrudProductsService,
    private categoriesService: CrudCategoriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
    this.dataSource = new MatTableDataSource<Product>();

    this.subscription = this.crud.readProducts().subscribe((products) => {
      this.dataSource.data = products;
    });

    this.filterControl = this.fb.control('');
    this.addProductForm = this.fb.group({
      name: ['', Validators.required],
      categoryID: ['', Validators.required],
      photoURL: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addProduct() {
    this.crud.createProduct(this.addProductForm.value);
  }

  editProduct(productID: string, product: Product) {
    const dialogRef = this.dialog.open(EditProductDialogComponent, {
      data: {
        categories: this.categories,
        ...product,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.crud.updateProduct(productID, response);
      }
    });
  }

  deleteProduct(productID: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'true') {
        this.crud.deleteProduct(productID);
      }
    });
  }

  applyFilter() {
    const filterValue = this.filterControl.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
