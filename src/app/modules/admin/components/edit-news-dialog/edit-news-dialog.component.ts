import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { News } from 'src/app/core/models/news.model';

@Component({
  templateUrl: './edit-news-dialog.component.html',
  styleUrls: ['./edit-news-dialog.component.scss'],
})
export class EditNewsDialogComponent implements OnInit {
  editNewsForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private news: News,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editNewsForm = this.fb.group({
      title: [this.news.title, Validators.required],
      content: [this.news.content, Validators.required],
    });
  }
}
