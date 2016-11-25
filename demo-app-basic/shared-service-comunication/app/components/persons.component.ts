import { Component, Input, EventEmitter, OnInit, Output, OnChanges, SimpleChanges, ViewChild, AfterViewInit  } from '@angular/core';
import { Person } from '../entity/person';
import { PersonSharedService } from './person-shared.service';

@Component({
  providers: [PersonSharedService],
  selector: 'persons',
  templateUrl: 'app/components/persons.component.html'

})

export class PersonsComponent { }

