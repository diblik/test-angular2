import {Person} from '../../model/person';
import {Router, ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {SelectItem} from 'primeng/primeng';
import {EventAggregatorService, Events} from "../../../service/event-aggregator.service";
import {Subject} from "rxjs";
import {PersonService} from "../../service/person-service";

@Component({
  selector: 'app-person-detail-template-driven',
  templateUrl: 'person-detail-template-driven.component.html',
  styleUrls: ['person-detail-template-driven.component.css']
})
export class PersonDetailTemplateDrivenComponent implements OnInit {

  private person: Person;
  private changed: boolean = false;
  private formInNewMode: boolean = true;
  private isSubmitted: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private eventAggregatorService: EventAggregatorService,
              private personService: PersonService) { }

  onDataChange() {
    this.changed = true;
  }

  ngOnInit() {
    this.route.data
      .map((data: { person: Person }) => {
        if(!data.person){
          return new Person();
        }
        return data.person;
      })
      .subscribe((person) => {
        this.person = person;
        this.formInNewMode = false;
        console.log("PersonDetailTemplateDrivenComponent - route.data.person", this.person);
      });
  }

  onSubmit({value, valid}: { value: Person, valid: boolean }) {
    console.log(this.person, value, valid, this.formInNewMode, this.changed);
    if (valid && this.changed) {
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
