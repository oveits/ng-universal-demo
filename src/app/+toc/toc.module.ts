import {NgModule, Component} from '@angular/core'
import {RouterModule} from '@angular/router'


@Component({
  selector: 'toc-view',
  template: `<h3>i'm a toc</h3>`
})
export class TocView {}

@NgModule({
  declarations: [TocView],
  imports: [
    RouterModule.forChild([
      { path: '', component: TocView, pathMatch: 'full'}
    ])
  ]
})
export class TocModule {

}
