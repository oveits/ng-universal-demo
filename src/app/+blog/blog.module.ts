import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
//import * as angular from "angular";
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject } from '@angular/core';

@Component({
  selector: 'blog-view',
  templateUrl: './blog.module.html'
})

export class BlogView implements OnInit {
  title: any = null;
  content: any = null;
  toc: any = null;

  constructor(private http: Http, private sanitizer: DomSanitizer, @Inject(PLATFORM_ID) private platformId: Object) {
      
  }

  ngOnInit(){
    this.getMyBlog();
  }

  private getMyBlog() {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts/3078')
                .map((res: Response) => res.json())
                 .subscribe(data => {
			this.title = data.title;
                        this.content = data.content;
                        if (isPlatformBrowser(this.platformId)) {
                            // Client only code.
                            this.toc = this.getToc(this.content);
                        }
                        //console.log(data);
                        console.log("content = " + this.content.changingThisBreaksApplicationSecurity);
                });
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

     // will be appended to the node id to make sure it is unique on the page:
     var id_suffix = 0;

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

	   // if headline has no id, add a unique id
           if ("" == value.id) {
               value.id = "id934752938475" + ++id_suffix;
           } 

	   // for each headline, create a list item with the corresponding HTML content:
           var li = pointer.appendChild(document.createElement("li"));
           li.innerHTML = '<a href="/blog#' + value.id + '">' + value.innerHTML + '</a>';
       }
     );
     
     // debugging:
     console.log(toc.innerHTML);

     // update the content with the changed contentdiv, which contains IDs for every headline
     //   note that we need to use the sanitizer.bypassSecurityTrustHtml function in order to tell angular
     //   not to remove the ids, when used as [innerHtml] attribute in the HTML template
     this.content = this.sanitizer.bypassSecurityTrustHtml(contentdiv.innerHTML);

     return(toc.innerHTML);
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

