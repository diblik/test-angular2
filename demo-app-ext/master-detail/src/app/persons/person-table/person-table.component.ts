import * as tls from 'tls';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PersonService } from '../service/person-service';
import { Person } from '../model/person';


@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent  implements OnInit {

    selectedPerson: Person;
    persons: Person[];

    constructor(private personService: PersonService, private router: Router) { }

    ngOnInit() {
        this.personService.getPersons().then(persons => this.persons = persons);
    }

     onRowSelect(event) {
        this.selectedPerson = JSON.parse(JSON.stringify(event.data));
    }

    goToDetail(){
        this.router.navigate(['/persons', this.selectedPerson.id]);
    }
}
