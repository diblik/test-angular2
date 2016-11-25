import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CanDeactivateGuard} from "../can-deactivate-guard";

const appRoutes: Routes = [
  {
    path: 'persons',
    loadChildren: 'app/persons/persons.module#PersonsModule', // lazy loading
    data: {
      title: 'Persons List'
    }
  },
  {
    path: '',
    loadChildren: 'app/home/home.module#HomeModule', // lazy loading
    data: {
      title: 'Home'
    }
  },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule,
  ],
  providers: [
    CanDeactivateGuard,
  ]
})
export class RoutingModule { }
