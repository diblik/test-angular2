import { Person } from '../model/person';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import {CanComponentDeactivate} from "../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";
import {Subject} from "rxjs";
import {PersonService} from "../service/person-service";

@Component({
  selector: 'app-person-detail-partially-model-driven',
  templateUrl: './person-detail-partially-model-driven.component.html',
  styleUrls: ['./person-detail-partially-model-driven.component.css']
})
export class PersonDetailPartiallyModelDrivenComponent implements OnInit, CanComponentDeactivate {

  firstname: FormControl;

  userform: FormGroup;

  isSubmitted: boolean;

  genders: SelectItem[];

  person: Person;

  changed: boolean = false;

  formInNewMode = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService,
              private personService: PersonService) {
  }

  ngOnInit() {

    this.initGenders();
    this.firstname =  new FormControl('',  Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)]));
    this.userform = this.fb.group({
      'firstname': this.firstname, // obdoba instance new FormControl('', Validators.required)
    });

    console.log("firstname", this.firstname);
    console.log("userform", this.userform);

    this.route.data
      .map((data: { person: Person }) => {
        if(!data.person){
          return new Person();
        }
        return data.person;
      })
      .subscribe((person) => {
        this.person = person;
        this.userform.patchValue(this.person);
        console.log(this.person);
      });

    this.userform.valueChanges.subscribe(()=>{
      this.changed = true;
    })
  }

  initGenders() {
    this.genders = [];
    this.genders.push({label: 'Vyberte pohlaví', value: ""});
    this.genders.push({label: 'Muž', value: "1"});
    this.genders.push({label: 'Žena', value: "0"});
  }

  onSubmit(value: string) {
    console.log(this.userform, this.person, value, this.formInNewMode, this.changed);

    if (this.changed) {
      this.isSubmitted = true;
      this.personService.savePerson(this.person).then(() => {
        this.gotToTable();
      })
    }
  }

  gotToTable() {
    this.router.navigate(['/persons']);
  }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.person || !this.changed || this.isSubmitted) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    let subject = new Subject<boolean>();
    // subject.subscribe(bool => {console.log("vysledek", bool)});
    this.eventAggregatorService.publishEvent(Events.showConfirmDialog,
      {message: "Změny nebudou uloženy. opravdu chcete odejít?" ,header:"Změny", acceptCallback: subject});
    return subject.asObservable().toPromise();
  }

}

