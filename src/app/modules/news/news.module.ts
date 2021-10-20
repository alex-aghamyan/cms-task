import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsPageComponent } from './page/news-page.component';
import { NewsItemComponent } from './components/news-item/news-item.component';

@NgModule({
  declarations: [NewsPageComponent, NewsItemComponent],
  imports: [CommonModule, NewsRoutingModule],
})
export class NewsModule {}
