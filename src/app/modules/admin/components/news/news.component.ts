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
import { News } from 'src/app/core/models/news.model';
import { CrudNewsService } from '../../services/crud-news.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { EditNewsDialogComponent } from '../edit-news-dialog/edit-news-dialog.component';

@Component({
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'title', 'content', 'Actions'];
  dataSource!: MatTableDataSource<News>;
  filterControl!: FormControl;
  addNewsForm!: FormGroup;
  subscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private crud: CrudNewsService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dataSource = new MatTableDataSource<News>();

    this.subscription = this.crud.getNews().subscribe((news) => {
      this.dataSource.data = news;
    });

    this.filterControl = this.fb.control('');
    this.addNewsForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addNews() {
    this.crud.createNews(this.addNewsForm.value);
  }

  editNews(newsID: string, news: News) {
    const dialogRef = this.dialog.open(EditNewsDialogComponent, {
      width: '350px',
      data: news,
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response) {
        this.crud.updateNews(newsID, response);
      }
    });
  }

  deleteNews(newsID: string) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (response === 'true') {
        this.crud.deleteNews(newsID);
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
