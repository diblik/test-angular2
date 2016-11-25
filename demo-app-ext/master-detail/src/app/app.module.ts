import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RoutingModule } from './routing/routing.module';
import { MenubarModule} from "primeng/components/menubar/menubar";

import { AppComponent } from './app.component';
import { PersonService } from "./persons/service/person-service";
import {ServiceModule} from "./service/service.module";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    RoutingModule,
    BrowserModule,
    MenubarModule,
    ServiceModule,
  ],
  providers: [
   { provide: PersonService, useClass: PersonService }, //PersonServiceMock
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
