import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeView } from './home/home-view.component';
import { TocView } from './+toc/toc.module';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    TransferHttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeView, pathMatch: 'full'},
      { path: 'lazy', loadChildren: './+lazy/lazy.module#LazyModule'},
      { path: 'blog', loadChildren: './+blog/blog.module#BlogModule'}
    ])
  ],
  declarations: [ AppComponent, HomeView, TocView],
  exports: [ AppComponent ]
})
export class AppModule {}
