import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Person } from '../entity/person';

@Component({
  selector: 'person-table',
  templateUrl: 'app/components/person-table.component.html'
})

export class PersonTableComponent {

  @Input()
  persons: Person[];

  @Input()
  selectedPerson: Person;

  @Output()
  onSelectEmit = new EventEmitter();

  onSelect(person: Person): void {
    this.onSelectEmit.emit(person);
    this.selectedPerson = person;
  }
}

