import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonTableComponent } from "./person-table/person-table.component";
import { PersonDetailResolve } from './service/person-detail-resolve';
import {CanDeactivateGuard} from "../can-deactivate-guard";
import {PersonDetailTemplateDrivenComponent} from "./person-detail-template-driven/person-detail-template-driven.component";
import {PersonDetailModelDrivenComponent} from "./person-detail-model-driven/person-detail-model-driven.component";

const appRoutes: Routes = [
  {
    path: '',
    component: PersonTableComponent,
    data: {
      title: 'Persons table'
    }
  },
    // children: [ // children znamena ze v PersonTableComponent musi byt <router-outler>
  {
    path: ':id',
    // component: PersonDetailTemplateDrivenComponent,
    component: PersonDetailModelDrivenComponent,
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
export class PersonRoutingModule { }
