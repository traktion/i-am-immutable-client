import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';
import {BlogComponent} from './blog/blog.component';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'blog/:listXor', component: BlogComponent },
  {path: 'blog/:listXor/article/:articleXor', component: ArticleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
