import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from './card-list/card-list.component';
import { CardComponent } from './card/card.component';

const routes: Routes = [{
  path: "card/:operation",
  component: CardComponent
},{
  path: "card-list",
  component: CardListComponent
}, {
  path: '',
  redirectTo: "card-list",
  pathMatch: 'full'
}, {
  path: "**",
  redirectTo: "card-list"
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
