import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from 'src/app/core/models/news.model';
import { GetNewsService } from 'src/app/core/services/get-news.service';

@Component({
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.scss'],
})
export class NewsPageComponent implements OnInit {
  news$!: Observable<News[]>;

  constructor(private newsService: GetNewsService) {}

  ngOnInit(): void {
    this.news$ = this.newsService.getNews();
  }
}
