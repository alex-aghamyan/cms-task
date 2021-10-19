import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from 'src/app/core/models/category.model';

@Component({
  templateUrl: './edit-category-dialog.component.html',
  styleUrls: ['./edit-category-dialog.component.scss'],
})
export class EditCategoryDialogComponent implements OnInit {
  editCategoryForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private category: Category,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editCategoryForm = this.fb.group({
      name: [this.category.name, Validators.required],
      link: [this.category.link, Validators.required],
    });
  }
}
