import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleNewsPageComponent } from './components/single-news-page/single-news-page.component';
import { NewsPageComponent } from './page/news-page.component';

const routes: Routes = [
  { path: '', component: NewsPageComponent },
  { path: ':id', component: SingleNewsPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewsRoutingModule {}
