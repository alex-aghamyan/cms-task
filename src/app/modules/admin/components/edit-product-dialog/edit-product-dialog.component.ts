import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';

interface ProductAndCategories extends Product {
  categories: Observable<Category[]>;
}

@Component({
  templateUrl: './edit-product-dialog.component.html',
  styleUrls: ['./edit-product-dialog.component.scss'],
})
export class EditProductDialogComponent implements OnInit {
  editProductForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductAndCategories,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editProductForm = this.fb.group({
      name: [this.data.name, Validators.required],
      categoryID: [this.data.categoryID, Validators.required],
      photoURL: [this.data.photoURL, Validators.required],
      description: [this.data.description, Validators.required],
      price: [this.data.price, Validators.required],
    });
  }
}
