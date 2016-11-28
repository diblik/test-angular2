import { Person } from '../model/person';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import {CanComponentDeactivate} from "../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";
import {Observable, Subject} from "rxjs";
import {PersonService} from "../service/person-service";

@Component({
  selector: 'app-person-detail-model-driven',
  templateUrl: './person-detail-model-driven.component2.html',
  styleUrls: ['./person-detail-model-driven.component.css']
})
export class PersonDetailModelDrivenComponent implements OnInit, CanComponentDeactivate {

  msgs: Message[] = [];

  userform: FormGroup;

  isSubmitted: boolean;

  genders: SelectItem[];

  person: Person;

  changed: boolean = false;

  private formInNewMode = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService,
              private personService: PersonService) {
    route.data.subscribe(d => { console.log(d) })
  }



  ngOnInit() {

    this.userform = this.fb.group({
      'firstname': ['', Validators.required], // obdoba instance new FormControl('', Validators.required)
      'lastname': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'birthday': ['', Validators.required],
      'gender': ['', Validators.required]
    });

    this.route.data
      .subscribe((data: { person: Person }) => {
        data.person.birthday = new Date();
        this.person = data.person;
        this.userform.patchValue(data.person);
        console.log(this.person);
      });

    this.userform.valueChanges.subscribe((data)=>{
      this.changed = true;
    })

    this.genders = [];
    this.genders.push({ label: 'Select Gender', value: '' });
    this.genders.push({ label: 'Male', value: 'Male' });
    this.genders.push({ label: 'Female', value: 'Female' });
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

