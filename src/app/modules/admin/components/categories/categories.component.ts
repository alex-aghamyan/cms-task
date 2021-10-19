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
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { CrudCategoriesService } from '../../services/crud-categories.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditCategoryDialogComponent } from '../edit-category-dialog/edit-category-dialog.component';

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'name', 'link', 'Actions'];
  dataSource!: MatTableDataSource<Category>;
  filterControl!: FormControl;
  addCategoryForm!: FormGroup;
  subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private crud: CrudCategoriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Category>();

    this.subscription = this.crud.getCategories().subscribe((categories) => {
      this.dataSource.data = categories;
    });

    this.filterControl = this.fb.control('');
    this.addCategoryForm = this.fb.group({
      name: ['', Validators.required],
      link: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addCategory() {
    this.crud.createCategory(this.addCategoryForm.value);
  }

  editCategory(categoryID: string, category: Category) {
    const dialogRef = this.dialog.open(EditCategoryDialogComponent, {
      width: '350px',
      data: category,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.crud.updateCategory(categoryID, response);
      }
    });
  }

  deleteCategory(categoryID: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'true') {
        this.crud.deleteCategory(categoryID);
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
