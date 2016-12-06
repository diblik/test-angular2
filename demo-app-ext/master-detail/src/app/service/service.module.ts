import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GrowlModule} from "primeng/components/growl/growl";
import {ServiceComponent} from "./service/service.component";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {ConfirmationService} from "primeng/components/common/api";
import {EventAggregatorService} from "./event-aggregator.service";
import { StartWithADirective } from './validators/start-with-a.directive';

@NgModule({
  imports: [
    CommonModule,
    GrowlModule,
    ConfirmDialogModule,
  ],
  exports:[
    ServiceComponent,
    StartWithADirective
  ],
  declarations: [
    ServiceComponent,
    StartWithADirective
  ],
  providers:[
    ConfirmationService,
    EventAggregatorService
  ]
})
export class ServiceModule { }
