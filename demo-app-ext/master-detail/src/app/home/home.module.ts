import { NgModule } from '@angular/core';
import {HomeComponent} from "./home/home.component";
import {Routes, RouterModule} from "@angular/router";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],

  declarations: [
    HomeComponent,
  ],

  exports: [
    RouterModule
  ],
})
export class HomeModule { }
