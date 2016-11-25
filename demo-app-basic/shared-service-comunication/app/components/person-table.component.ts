import { Component } from '@angular/core';
import { Person } from '../entity/person';
import { PersonSharedService } from './person-shared.service';

@Component({
  selector: 'person-table',
  templateUrl: 'app/components/person-table.component.html'
})

export class PersonTableComponent {
  private persons: Person[]
  
  constructor(private personSharedService: PersonSharedService) {
    console.log("PersonTableComponent => getPersons() - register");
    personSharedService.getPersons().subscribe(persons => {
      console.log("PersonTableComponent getPersons() observable invoked", persons);
      this.persons = persons
    });
  }

  private onSelect(person: Person){
    console.log("PersonTableComponent.onSelect()", person);
    this.personSharedService.selectPerson(person);
  }
}

