import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './page/news-page.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { MatCardModule } from '@angular/material/card';
import { SingleNewsPageComponent } from './components/single-news-page/single-news-page.component';

@NgModule({
  declarations: [NewsPageComponent, NewsItemComponent, SingleNewsPageComponent],
  imports: [CommonModule, NewsRoutingModule, MatCardModule],
})
export class NewsModule {}
