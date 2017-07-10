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
                        console.log(data);
                });
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
