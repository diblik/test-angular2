import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/components/common/api";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private items: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Demo App',
        routerLink: [""]
      },
      {
        label: 'Osoby',
        routerLink: ["/persons"]
      }
    ];
  }

}
