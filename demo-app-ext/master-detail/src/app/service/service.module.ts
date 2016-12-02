import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GrowlModule} from "primeng/components/growl/growl";
import {ServiceComponent} from "./service/service.component";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {ConfirmationService} from "primeng/components/common/api";
import {EventAggregatorService} from "./event-aggregator.service";

@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  exports:[
    ServiceComponent,
  ],
  declarations: [
    ServiceComponent
  ],
  providers:[
    ConfirmationService,
    EventAggregatorService
  ]
})
export class ServiceModule { }
