import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../entity/person';
import { PersonSharedService } from './person-shared.service';
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'person-detail',
  templateUrl: 'app/components/person-detail.component.html'
})

export class PersonDetailComponent { //implements OnInit {
  private person: Person;
  
  constructor(private personSharedService: PersonSharedService ) {
    console.log("PersonDetailComponent => getSelectedPerson() - register");
    personSharedService.getSelectedPerson().subscribe(person => {
      console.debug("PersonDetailComponent => getSelectedPerson() - invoke", person);
      this.person = person
    })
  }  
}