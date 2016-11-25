import { Person } from '../model/person';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Message, SelectItem } from 'primeng/primeng';
import {CanComponentDeactivate} from "../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";
import {Observable, Subject} from "rxjs";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit, CanComponentDeactivate {

  msgs: Message[] = [];

  userform: FormGroup;

  submitted: boolean;

  genders: SelectItem[];

  description: string;

  person: Person;

  changed: boolean = false;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService ) {
    route.data.subscribe(d => { console.log(d) })
  }

  /*  id: string;
   firstname: string;
   lastname: string;
   email: string;
   birthday: Date;
   gender: Number;*/

  ngOnInit() {
    this.userform = this.fb.group({
      'firstname': new FormControl('', Validators.required),
      'lastname': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)])),
      // 'birthday': new FormControl('', Validators.required),
      'gender': new FormControl('', Validators.required)
    });



    this.route.data
      .subscribe((data: { person: Person }) => {
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
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({ severity: 'info', summary: 'Success', detail: 'Form Submitted' });
  }

  get diagnostic() { return JSON.stringify(this.userform.value); }

  canDeactivate(): Promise<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (!this.person || !this.changed) {
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
