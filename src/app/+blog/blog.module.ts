import {NgModule, Component, OnInit} from '@angular/core'
import {RouterModule} from '@angular/router'
//import { TransferHttp } from '../../modules/transfer-http/transfer-http';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'blog-view',
  template: `<h1 innerHtml="{{title}}"></h1><div innerHtml="{{content}}"></div>`
})

export class BlogView implements OnInit {
  data: any = null;
  title: any = null;
  content: any = null;
  public subs: Observable<string>;

  constructor(private http: Http) {
  }

  ngOnInit(){
    this.getMyBlog();
  }

  private getMyBlog() {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts/3078')
                .map((res: Response) => res.json())
                 .subscribe(data => {
                        this.data = data;
			this.title = this.data.title;
			this.content = this.data.content;
                        console.log(this.data);
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
