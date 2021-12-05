import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/core/models/news.model';

@Component({
  selector: 'news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.scss'],
})
export class NewsItemComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  @Input() news!: News;

  openNews() {
    this.router.navigate([this.news.id], { relativeTo: this.route });
  }
}
