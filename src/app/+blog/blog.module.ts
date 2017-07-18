import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'blog-view',
  templateUrl: './blog.module.html'
})

export class BlogView implements OnInit {
  title: any = null;
  content: any = null;
  toc: any = null;

  constructor(private http: Http) {
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
                        this.toc = this.getToc(data.content);
                        console.log(data);
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

	   // for each headline, create a list item with the corresponding HTML content:
           var li = pointer.appendChild(document.createElement("li"));
	   li.innerHTML = value.innerHTML;
       }
     );
     
     // debugging:
     console.log(toc.innerHTML);

     return(toc.innerHTML);
  }
}


@NgModule({
  declarations: [BlogView],
  imports: [
    RouterModule.forChild([
      { path: '', component: BlogView, pathMatch: 'full'}
    ])
  ]
})

export class BlogModule {

}

