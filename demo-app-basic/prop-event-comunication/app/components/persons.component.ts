import { Component, Input, EventEmitter, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Person } from '../entity/person';
import { PersonService } from '../service/person.service';

@Component({
  //providers: [PersonService],
  selector: 'persons',
  templateUrl: 'app/components/persons.component.html'
})

export class PersonsComponent implements OnInit {
  enableDeleteButton = false; 
  enableSaveButton = false; 
  person: Person;
  persons: Person[];

  constructor(private personService: PersonService) { }

  onSelect(person: Person): void {
    this.person = person;
    this.enableDeleteButton = true;
    this.enableSaveButton = true;
  }

  onCreate(): void {
    this.person = new Person();
    this.enableSaveButton = true;
    this.enableDeleteButton = false;
  }

  onSave(): void {
    this.personService.savePerson(this.person).then(person => {
      // pridavam jen nove osoby, zbytek se resi pres biding
      if(this.person._id == null){
        this.persons.push(person);
      }
      this.enableSaveButton = false;
      this.enableDeleteButton = false;
      this.person = null;
    });
  }

  onDelete(): void {
    this.personService.deletePerson(this.person).then(response => {
      if (response) {
        var index = this.persons.indexOf(this.person, 0);
        if (index > -1) {
          this.persons.splice(index, 1);
        }
        this.person = null;
        this.enableSaveButton = false;
        this.enableDeleteButton = false;
      } else {
        console.error("Nedoslo ke smazani osoby. " + this.person)
      }
    });
  }

  ngOnInit(): void {
    this.personService.getPersons().then(persons => {
      this.persons = persons;
    });
  }
}

