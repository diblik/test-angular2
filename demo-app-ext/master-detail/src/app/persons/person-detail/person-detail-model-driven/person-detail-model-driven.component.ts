import {Person} from '../../model/person';

import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit, ElementRef, ViewChildren} from '@angular/core';
import {FormBuilder, FormGroup, FormControlName, Validators} from '@angular/forms';
import {CanComponentDeactivate} from "../../../can-deactivate-guard";
import {EventAggregatorService, Events} from "../../../service/event-aggregator.service";
import {Subject, Subscription, Observable} from "rxjs";
import {PersonService} from "../../service/person-service";
import {GenericValidator} from "../../../service/validators/generic-validator";
import {TextValidators} from "../../../service/validators/text-validators";


@Component({
  selector: 'app-person-detail-model-driven',
  templateUrl: 'person-detail-model-driven.component.html',
  styleUrls: ['person-detail-model-driven.component.css']
})
export class PersonDetailModelDrivenComponent implements OnInit, CanComponentDeactivate {
  @ViewChildren(FormControlName, {read: ElementRef})
  private formControls: ElementRef[];

  private errorMessage: string;
  private displayMessage: { [key: string]: string } = {};

  private validationMessages: { [key: string]: { [key: string]: string } };
  private genericValidator: GenericValidator;

  private personForm: FormGroup;
  private isSubmitted: boolean;
  private person: Person;
  private changed: boolean = false;
  private formInNewMode = true;

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService,
              private personService: PersonService) {

    this.validationMessages = {
      firstname: {
        required: 'Jméno se musí vyplnit.',
        minlength: 'Zadejte minimálně 3 znaky (zadáno {actualLength} z {requiredLength}).',
        maxlength: 'Zadejte maximálně 10 znaků (zadáno {actualLength} z {requiredLength}).',
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

    this.personForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10), TextValidators.startWithA()]],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      birthday: ['', Validators.required],
      gender: ['', Validators.required],
    });

    // set data edit or new
    this.route.data
      .map((data: { person: Person }) => {
        this.formInNewMode = !data.person;
        if (!data.person) {
          return new Person();
        }
        return data.person;
      })
      .subscribe((person) => {
        this.person = person;
        this.personForm.patchValue(this.person);
        console.log("New person:", this.formInNewMode, ", person:", this.person);
      });

    // detect change
    this.personForm.valueChanges.subscribe((data) => {
      this.changed = true;
    })
  }

  ngAfterViewInit(): void {
    console.log("ViewChildren" , this.formControls)

    // nad kazdou komponentou formulare pridam posluchace na zruseni focusu (blur)
    let controlBlurs: Observable<any>[] = this.formControls
      .map((formControl: ElementRef) => Observable.fromEvent(formControl.nativeElement, 'blur'));

    // posluchace na blur spojim s posluchacem na zmenu dat ve formulari
    // validuje se i pri prvnim opusteni komponenty (je mozne zmenit)
    Observable.merge(this.personForm.valueChanges, ...controlBlurs).debounceTime(100).subscribe(value => {
      this.displayMessage = this.genericValidator.processMessages(this.personForm);

      // propagace novych, validnich dat do this.person
      if(this.displayMessage['error'] === "false"){
        for (let field in value){
          this.person[field] = value[field];
        }
      }
    });
  }

  onSubmit(value: string) {
    console.log(this.personForm, this.person, value, this.formInNewMode, this.changed);
    if (this.personForm.dirty && this.personForm.valid) {

    }
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
    if (!this.person || !this.changed || this.isSubmitted) {
      return true;
    }

    let subject = new Subject<boolean>();
    this.eventAggregatorService.publishEvent(Events.showConfirmDialog,
      {message: "Změny nebudou uloženy. opravdu chcete odejít?", header: "Změny", acceptCallback: subject});
    return subject.asObservable().toPromise();
  }

}

