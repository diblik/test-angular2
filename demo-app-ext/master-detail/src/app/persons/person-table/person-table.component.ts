import * as tls from 'tls';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {PersonService} from '../service/person-service';
import {Person} from '../model/person';


@Component({
  selector: 'app-person-table',
  templateUrl: './person-table.component.html',
  styleUrls: ['./person-table.component.css']
})
export class PersonTableComponent implements OnInit {

  selectedPerson: Person;
  persons: Person[];

  constructor(private personService: PersonService, private router: Router, private route: ActivatedRoute) {
    route.data.subscribe(d => {
      console.log("route.data.subscribe", d)
      this.personService.getPersons().then(persons => this.persons = persons);
    })
  }

  ngOnInit() {
    // this.personService.getPersons().then(persons => this.persons = persons);
  }

  onRowSelect(event) {
    this.selectedPerson = JSON.parse(JSON.stringify(event.data));
  }

  onDetail() {
    this.router.navigate(['/persons', this.selectedPerson.id]);
  }

  onNew() {
    this.router.navigate(['/persons', 'new']);
  }

  onRemove() {
   this.personService.deletePerson(this.selectedPerson).then(()=> {
     this.personService.getPersons().then(persons => this.persons = persons);
   });
  }
}
