import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PersonTableComponent} from "./person-table/person-table.component";
import {PersonDetailResolve} from './service/person-detail-resolve';
import {CanDeactivateGuard} from "../can-deactivate-guard";
import {PersonDetailTemplateDrivenComponent} from "./person-detail/person-detail-template-driven/person-detail-template-driven.component";
import {PersonDetailModelDrivenComponent} from "./person-detail/person-detail-model-driven/person-detail-model-driven.component";
import {PersonDetailPartiallyModelDrivenComponent} from "./person-detail/person-detail-partially-model-driven/person-detail-partially-model-driven.component";
import {PersonDetailReactiveComponent} from "./person-detail/person-detail-reactive/person-detail-reactive.component";
import {PersonDetailComponent} from "./person-detail/person-detail.component";

const appRoutes: Routes = [
  {
    path: '',
    component: PersonTableComponent,
    data: {
      title: 'Persons table'
    }
  },
  {
    path: 'new',
    component: PersonDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    data: {
      title: 'Persons new'
    }
  },
  // children: [ // children znamena ze v PersonTableComponent musi byt <router-outler>
  {
    path: ':id',
    // component: PersonDetailReactiveComponent,
    // component: PersonDetailTemplateDrivenComponent,
    component: PersonDetailComponent,
    // component: PersonDetailModelDrivenComponent,
    // component: PersonDetailPartiallyModelDrivenComponent,
    canDeactivate: [CanDeactivateGuard],
    resolve: {
      person: PersonDetailResolve
    },
    data: {
      title: 'Persons detail'
    }
  },

];

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class PersonRoutingModule {
}
