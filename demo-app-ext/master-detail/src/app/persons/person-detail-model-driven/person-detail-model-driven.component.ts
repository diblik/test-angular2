import {Person, PersonValidations} from '../model/person';

import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { SelectItem} from 'primeng/primeng';
import {CanComponentDeactivate} from "../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";
import {Subject} from "rxjs";
import {PersonService} from "../service/person-service";

@Component({
  selector: 'app-person-detail-model-driven',
  templateUrl: './person-detail-model-driven.component.html',
  styleUrls: ['./person-detail-model-driven.component.css']
})
export class PersonDetailModelDrivenComponent implements OnInit, CanComponentDeactivate {

  formError: {[id: string]: string};
  userform: FormGroup;
  isSubmitted: boolean;
  genders: SelectItem[];
  person: Person;
  personValidations: PersonValidations = new PersonValidations();
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
      'firstname': ['', this.personValidations.getValidators('firstname')] // this.person.firstname
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

    this.userform.valueChanges.subscribe((data) => {
      this.onValueChanged(data);
      this.changed = true;
    })
  }


  initGenders() {
    this.genders = [];
    this.genders.push({label: 'Vyberte pohlaví', value: ""});
    this.genders.push({label: 'Muž', value: "1"});
    this.genders.push({label: 'Žena', value: "0"});
  }

  onValueChanged(data: any) {
      // console.log(data);
      for (let field in this.formError) {
        this.formError[field] = '';
        let hasError = this.userform.controls[field].dirty && !this.userform.controls[field].valid;
        if(hasError){
          // pokud je chyba zobrazim k ni patricnou message
          for (let key in this.userform.controls[field].errors){
            this.formError[field] += this.personValidations.getMessage(field, key) + ' ';
          }
        } else {
          // jen pokud je vse validni tak prepisu puvodni hodnotu
          this.person[field] = data[field];
        }
      }
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

}

