import {Person} from '../../model/person';

import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SelectItem} from 'primeng/primeng';
import {CanComponentDeactivate} from "../../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../../service/event-aggregator.service";
import {Subject, Observable} from "rxjs";
import {PersonService} from "../../service/person-service";


@Component({
  selector: 'app-person-detail-reactive',
  templateUrl: 'person-detail-reactive.component.html',
  styleUrls: ['person-detail-reactive.component.css']
})
export class PersonDetailReactiveComponent implements OnInit, CanComponentDeactivate {

  formError: {[id: string]: string};
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

    this.formError = {
      'firstname': '',
    }
  }

  ngOnInit() {
    this.initGenders();
    this.userform = this.fb.group({
      'firstname': [] //this.person.firstname
    });

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

    let validFirstname = this.validFirstname(this.userform.valueChanges).map((data: any) => {
      let mess = ''
      for (let message of data.messages) {
        mess += message + ' '
      }
      console.log("validFirstname ", mess);
      return {field: data.field, messages: mess};
    })

    let value = this.userform.valueChanges
      .map((value: any) => {
        return value['firstname'];
      });

    Observable.zip(validFirstname, value)
      .subscribe(data => {
        this.changed = true;
        console.log("Observable.zip ", data);
        this.formError[data[0].field] = data[0].messages;
        if (!data[0].messages) {
          this.person[data[0].field] = data[1];
        }
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
      {message: "Změny nebudou uloženy. opravdu chcete odejít?", header: "Změny", acceptCallback: subject});
    return subject.asObservable().toPromise();
  }

  validFirstname(observable: Observable<any>): Observable<{field: string, messages: string[]}> {
    return observable
      .map((value: any) => {
        let messages = []
        let field = 'firstname';
        let data = value[field];

        if (!data) {
          messages.push("Jméno se musí vyplnit.");
        } else if (data.length < 3) {
          messages.push("Zadejte minimálně 3 znaky.");
        }

        if (data.length >= 10) {
          messages.push("Zadejte maximálně 10 znaků.");
        }

        if (data && data[0].toUpperCase() !== 'A') {
          messages.push("Text musí začínat znakem \'a\' nebo \'A\'.");
        }

        return {field: field, messages: messages};
      });
  }

}


