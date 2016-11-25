import { NgModule }      from '@angular/core';
// imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule  }     from '@angular/http';
// declarations
import { PersonsComponent }  from './components/persons.component';
import { PersonTableComponent }  from './components/person-table.component';
import { PersonDetailComponent }  from './components/person-detail.component';
import { PersonActionComponent }  from './components/person-action.component';
import { AppComponent }  from './components/app.component';
// providers
import { PersonService } from './service/person.service';
import { PersonServiceMock } from './service/person.service.mock';

@NgModule({
 providers: [ 
   { provide: PersonService, useClass: PersonService }, //PersonServiceMock
 ],
 imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonTableComponent,
    PersonDetailComponent,
    PersonActionComponent
  ],
  bootstrap: [
    AppComponent 
  ]
})

export class AppModule { }