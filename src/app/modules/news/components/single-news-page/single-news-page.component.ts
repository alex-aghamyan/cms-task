import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { News } from 'src/app/core/models/news.model';
import { GetNewsService } from 'src/app/core/services/get-news.service';

@Component({
  templateUrl: './single-news-page.component.html',
  styleUrls: ['./single-news-page.component.scss'],
})
export class SingleNewsPageComponent implements OnInit {
  news$: Observable<News> = EMPTY;

  constructor(
    private newsService: GetNewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.news$ = this.route.params.pipe(
      switchMap((params) => {
        return this.newsService.getNewsById(params.id);
      })
    );
  }
}
