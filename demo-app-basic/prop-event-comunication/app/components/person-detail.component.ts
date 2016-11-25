import { Component, Input } from '@angular/core';
import { Person } from '../entity/person';

@Component({
  selector: 'person-detail',
  templateUrl: 'app/components/person-detail.component.html'
})

export class PersonDetailComponent {
	@Input()
 	person: Person;
}