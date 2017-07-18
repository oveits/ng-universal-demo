import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';
import * as angular from "angular";


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
//return 'test';
     var div = null;
     div = typeof document != 'undefined' ? document.createElement("div") : null;
     //div = typeof window != 'undefined' ? window.document.createElement("div") : null;
     //if( div == null) { div = angular.element('<div/>')[0]};

     //var div = document.createElement("div");
     //var div = angular.element('<div/>')[0];

     //var tmp = angular.element(document).createElement("div");
     //var div = tmp[0];
console.log(div)
     //tmp.appendChild(document.createTextNode("<h1>header 1</h1><h1>header 2</h1>"));
     div.innerHTML = content;
//return div.innerHTML;
     //console.log(div.innerHTML); // <p>Test</p>

     //var h1array = tmp.getElementsByTagName("h1");
     //var harray = tmp.querySelectorAll("h1, h2, h3, h4, h5, h6");
     //for (var h of harray) {
         //console.log(h.tagName + ": " + h.innerHTML);
     //}

     var myArrayOfNodes = [].slice.call(div.querySelectorAll("h1, h2, h3, h4, h5, h6"));
     var toc = document.createElement("ul");
     var target = toc;
     myArrayOfNodes.forEach( 
       function(value, key, listObj) { 
	   console.log(value.tagName + ": " + value.innerHTML);
	   if ( "H1" == value.tagName ) { 
	       target = toc;
           }
           if ( "H2" == value.tagName && target == toc ) {
               target = target.appendChild(document.createElement("ul"));
           }
           //if ( "H1" == value.tagName || "H2" == value.tagName ) {
               var li = target.appendChild(document.createElement("li"));
	       li.innerHTML = value.innerHTML;
           //}
	   //console.log(toc.innerHTML); 
       }
//,
	       //"myThisArg"

     );
     
     console.log(toc.innerHTML);

     //var contentDOM = document.createTextNode(content);
     //console.log(contentDOM.innerHTML);

     return(
         toc.innerHTML
     );
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

