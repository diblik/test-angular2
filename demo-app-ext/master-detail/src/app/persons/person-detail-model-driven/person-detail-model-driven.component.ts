import {Person, PersonValidations} from '../model/person';

import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, Directive, ElementRef, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormControlName, Validators} from '@angular/forms';
import { SelectItem} from 'primeng/primeng';
import {CanComponentDeactivate} from "../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../service/event-aggregator.service";
import {Subject, Subscription, Observable} from "rxjs";
import {PersonService} from "../service/person-service";
import {GenericValidator} from "../../service/validators/generic-validator";
import {TextValidators} from "../../service/validators/text-validators";
// import {GenericValidator} from "./validators/generic-validator";
// import {NumberValidators} from "./validators/number.validator";


@Component({
  selector: 'app-person-detail-model-driven',
  templateUrl: './person-detail-model-driven.component.html',
  styleUrls: ['./person-detail-model-driven.component.css']
})
export class PersonDetailModelDrivenComponent implements OnInit, CanComponentDeactivate {
  @ViewChildren(FormControlName, { read: ElementRef }) formControls: ElementRef[];

  errorMessage: string;
  // productForm: FormGroup;
  displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  formError: {[id: string]: string};
  userform: FormGroup;
  isSubmitted: boolean;
  genders: SelectItem[];
  person: Person;
  // personValidations: PersonValidations = new PersonValidations();
  changed: boolean = false;
  private formInNewMode = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService,
              private personService: PersonService) {

    this.validationMessages = {
      firstname: {
        required: 'Jméno se musí vyplnit.',
        minlength: 'Zadejte minimálně 3 znaky.',
        maxlength: 'Zadejte maximálně 10 znaků.',
        startWithA: 'Text musí začínat znakem \'a\' nebo \'A\'.'
      },
      lastname: {
        required: 'Příjmení se musí vyplnit.',
      },
      email: {
        required: 'Email se musí vyplnit.',
      },
      birthday: {
        required: 'Datum narození se musí vyplnit.',
      },
      gender: {
        required: 'Pohlaví se musí vyplnit.',
      },
    };

    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit() {
    this.initGenders();

    this.userform = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), TextValidators.startWithA() ]],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
    });
    // set data edit i new
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

    // detect change
    this.userform.valueChanges.subscribe((data) => {
      // this.onValueChanged(data);
      this.changed = true;
    })
  }

  initGenders() {
    this.genders = [];
    this.genders.push({label: 'Vyberte pohlaví', value: ""});
    this.genders.push({label: 'Muž', value: "1"});
    this.genders.push({label: 'Žena', value: "0"});
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formControls
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    Observable.merge(this.userform.valueChanges, ...controlBlurs).debounceTime(800).subscribe(value => {
      console.log("info: ", value)
      this.displayMessage = this.genericValidator.processMessages(this.userform);
    });
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

