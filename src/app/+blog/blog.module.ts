import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { SafeHtml } from '@angular/platform-browser';
//import * as angular from "angular";

@Pipe({
  name: 'sanitizeHtml'
})

@Component({
  selector: 'blog-view',
  templateUrl: './blog.module.html'
})

export class BlogView implements OnInit {
  title: any = null;
  content: any = null;
  contentDOM: any = document.createElement("div");
  toc: any = null;
  status: any = null;
  statusText: any = null;
  err: any = null;

  constructor(private http: Http, private sanitizer: DomSanitizer) {
//var app = angular.module('myApp', ['ngSanitize']);
      
  }

  goTo(location: string): void {
    window.location.hash = location;
  }

  ngOnInit(){
    this.getMyBlog();
  }

  private getMyBlog() {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts/3078')
                .map((res: Response) => res.json())
                .subscribe(
                    data => {
			this.title = data.title;
			this.content = data.content;
                        this.toc = this.getToc(this.content);
                        //console.log(data);
                        console.log("content = " + this.content);
                    }, 
                    (err) => console.log(err) ,
                    (err) => {this.err = console.log(err)} 
//                    ,
//                    status => {
//                        this.status = status;
//                    },
//                    statusText => {
//                        this.statusText = statusText;
//                    }
                );
  }

  private getToc(content: any) {
     // create div for holding the content
     var contentdiv = document.createElement("div");
     contentdiv.innerHTML = content;

     // create an array of headlines:
     var myArrayOfHeadlineNodes = [].slice.call(contentdiv.querySelectorAll("h1, h2"));

     // initialize table of contents (toc):
     var toc = document.createElement("ul");

     // initialize a pointer that points to toc root:
     var pointer = toc;
var k = 0;

     // loop through the array of headlines
     myArrayOfHeadlineNodes.forEach( 
       function(value, key, listObj) { 
	   
           // if we have detected a top level headline ...
	   if ( "H1" == value.tagName ) { 
	       // ... reset the pointer to top level:
	       pointer = toc;
           }

	   // if we are at top level and we have detected a headline level 2 ...
           if ( "H2" == value.tagName && pointer == toc ) {
	       // ... create a nested unordered list within the current list item:
               pointer = pointer.appendChild(document.createElement("ul"));
           }

           if ("" == value.id) {
               value.id = "id" + Date.now() + ++k;
           } 

	   // for each headline, create a list item with the corresponding HTML content:
           var li = pointer.appendChild(document.createElement("li"));
	   //li.innerHTML = '<a ng-click="gotoElement(' + "'" + value.id + "'" + ')">' + value.innerHTML + '</a>';
	   //li.innerHTML = '<a href="./blog#' + value.id + '">' + value.innerHTML + '</a>';
	   //li.innerHTML = '<a ng-click="goTo(' + "'" + value.id + "'" + ')">' + value.innerHTML + '</a>';
           // working html example: <a href="/blog#blogend" [ngx-scroll-to]="'blogend'">Go to the end of the blog</a>
           //li.innerHTML = '<a href="/blog#blogend" [ngx-scroll-to]="' + "'blogend'" + '">' + value.innerHTML + '</a>';
           //li.innerHTML = '<a href="/blog#' + 'blogend' + '" [ngx-scroll-to]="' + "'" + 'blogend' + "'" + '">' + value.innerHTML + '</a>';
           //value.id = 'blogend';
           li.innerHTML = '<a href="/blog#' + value.id + '" [ngx-scroll-to]="' + "'" + value.id + "'" + '">' + value.innerHTML + '</a>';
       }
     );
     
     // debugging:
     console.log(toc.innerHTML);

     // add the random ids to the content:
     //content = contentdiv.innerHTML;
//     this.content = contentdiv.innerHTML;
     this.content = this.sanitizer.bypassSecurityTrustHtml(contentdiv.innerHTML);
     this.contentDOM = contentdiv;

     return(toc.innerHTML);
  }
}

export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}


@NgModule({
  declarations: [BlogView],
  imports: [
    ScrollToModule.forRoot(),
    RouterModule.forChild([
      { path: '', component: BlogView, pathMatch: 'full'}
    ])
  ]
})

export class BlogModule {

}

