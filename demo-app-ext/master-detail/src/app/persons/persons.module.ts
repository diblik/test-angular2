import { PersonDetailResolve } from './service/person-detail-resolve';
import { NgModule } from '@angular/core';
import { PersonDetailComponent } from "./person-detail/person-detail.component";
import { HttpModule } from "@angular/http";
import { GrowlModule } from "primeng/components/growl/growl";
import { MenuModule } from "primeng/components/menu/menu";
import { MenubarModule } from "primeng/components/menubar/menubar";
import { DataTableModule } from "primeng/components/datatable/datatable";
import { ButtonModule } from "primeng/components/button/button";
import { PanelModule } from "primeng/components/panel/panel";
import { DropdownModule } from "primeng/components/dropdown/dropdown";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { PersonService } from "./service/person-service";
import { PersonTableComponent } from "./person-table/person-table.component";
import { CommonModule } from "@angular/common";
import {PersonRoutingModule} from "./persons-routing.module";
import {EventAggregatorService} from "../service/event-aggregator.service";
import {ConfirmationService} from "primeng/components/common/api";
import {CalendarModule} from "primeng/components/calendar/calendar";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    PersonRoutingModule,
    GrowlModule,
    MenuModule,
    MenubarModule,
    DataTableModule,
    ButtonModule,
    PanelModule,
    DropdownModule,
    CalendarModule,
  ],
  declarations: [
    PersonDetailComponent,
    PersonTableComponent
  ],
  providers: [
    PersonService,
    PersonDetailResolve,
    ConfirmationService,
  ]
})
export class PersonsModule { }
