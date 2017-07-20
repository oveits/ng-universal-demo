import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


@Component({
  selector: 'blog-view',
  templateUrl: './blog.module.html'
})

export class BlogView implements OnInit {
  title: any = null;
  content: any = null;
  toc: any = null;

  constructor(private http: Http, private router: Router) {
    // from: https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
    router.events.subscribe(s => {
      if (s instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          const element = document.querySelector("#" + tree.fragment);
          if (element) { element.scrollIntoView(element); }
        }
      }
    });
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
                 .subscribe(data => {
			this.title = data.title;
			this.content = data.content;
                        this.toc = this.getToc(this.content);
                        //console.log(data);
                        console.log("content = " + this.content);
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
	   li.innerHTML = '<a ng-click="gotoElement(' + "'" + value.id + "'" + ')">' + value.innerHTML + '</a>';
	   //li.innerHTML = '<a href="./blog#' + value.id + '">' + value.innerHTML + '</a>';
	   //li.innerHTML = '<a ng-click="goTo(' + "'" + value.id + "'" + ')">' + value.innerHTML + '</a>';
       }
     );
     
     // debugging:
     console.log(toc.innerHTML);

     // add the random ids to the content:
     //content = contentdiv.innerHTML;
     this.content = contentdiv.innerHTML;

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

