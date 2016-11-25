import { Component, OnInit } from '@angular/core';
import {EventAggregatorService, Events} from "../event-aggregator.service";
import {Message, ConfirmationService} from "primeng/components/common/api";
import {Observable} from "rxjs";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  growlMsgs: Message[] = [];
  index = 0;

  constructor(private eventAggregatorService: EventAggregatorService, private confirmationService: ConfirmationService) {

    eventAggregatorService.listenEventData(Events.showGlobalMessage).subscribe((mess:string)=> {
      // max 4 message TODO - udelat mizeni zprav dle toho jak dorazily ne najednou
      if(this.index > 3){
        this.index = 0;
      }
      this.growlMsgs.splice(this.index, 1, {severity:'info', summary:'Confirmed', detail:mess});
      this.index ++;
      console.log (this.index , this.growlMsgs)
    })

    eventAggregatorService.listenEventData(Events.showConfirmDialog).subscribe((data)=> {
      this.confirmationService.confirm({
        header: data.header || "Info",
        message: data.message || 'Are you sure that you want to perform this action?',
        accept: () => {
          data.acceptCallback.next(true);
          data.acceptCallback.complete();
        },
        reject: () => {
          data.acceptCallback.next(false);
          data.acceptCallback.complete();
        }
      });
    })
  }

  ngOnInit() {}

}
