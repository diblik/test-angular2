import {Component} from '@angular/core';
import {TestBed, inject, async, TestComponentBuilder} from '@angular/core/testing';

import { PersonService, IPersonService } from '../service/person.service';
import { Person } from '../entity/person';
import { PersonTableComponent } from './person-table.component';
import { PersonsComponent } from './persons.component';
import { PersonDetailComponent }  from './person-detail.component';
import { PersonActionComponent }  from './person-action.component';

import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';

import '../../node_modules/zone.js/lib/zone-spec/async-test.js'

class PersonServiceMock implements IPersonService {

  getPersons(): Promise<Person[]> {
    console.log("Mock-getPersons");
    let persons: Person[] = [
      { _id: '1', firstname: 'Tomáš', lastname: "Marný", email: "marny@seznam.cz", __v: 0 },
      { _id: '2', firstname: 'Ota', lastname: "Bota", email: "bota@seznam.cz", __v: 0 }
    ];
    return Promise.resolve<Person[]>(persons);
  };

  getPerson(id: string): Promise<Person> { console.log("Mock-getPerson"); return null; };
  deletePerson(person: Person): Promise<Boolean> { console.log("Mock-deletePerson"); return null };
  savePerson(person: Person): Promise<Person> { console.log("Mock-savePerson"); return null };
  updatePerson(person: Person): Promise<Person> { console.log("Mock-updatePerson"); return null };
  createPerson(person: Person): Promise<Person> { console.log("Mock-createPerson"); return null };
}

beforeEach(() => {
  TestBed.configureTestingModule({
    declarations: [
      PersonsComponent, PersonTableComponent, PersonDetailComponent, PersonActionComponent
    ],
    providers: [{ provide: PersonService, useClass: PersonServiceMock }],
    imports: [FormsModule, HttpModule]
  });
});

//globalni
describe("PersonComponent", () => {


  describe("global service mock", () => {
    beforeEach(async(() => {
      TestBed.compileComponents().catch(error => console.error(error));
    }));

    it('should create an instance', async(() => {
      let fixture = TestBed.createComponent(PersonsComponent);
      let componentInstance = fixture.componentInstance;
      fixture.detectChanges();

      let nativeElement = fixture.nativeElement;
      // componentInstance.onInit(); 
      console.log(fixture.nativeElement);
      expect(1).toBeDefined();
      // basse controls
      //expect(componentInstance.persons).toBeDefined();
      // expect(componentInstance.persons.length).toBe(2);
    }
    ));
  });

  // lokalni 
  describe("local service mock", () => {

    beforeEach(async(() => {
      TestBed.compileComponents().catch(error => console.error(error));
    }));

    it('should create an instance', async(inject([TestComponentBuilder], (tbc: TestComponentBuilder) => {
      tbc.overrideProviders(PersonsComponent, [{ provide: PersonService, useClass: PersonServiceMock }])
        .createAsync(PersonsComponent).then(fixture => {
          let componentInstance = fixture.componentInstance;
          //  let persons: Person[] = [
          //   { _id: '1', firstname: 'Tomáš', lastname: "Marný", email: "marny@seznam.cz", __v: 0 },
          //   { _id: '2', firstname: 'Ota', lastname: "Bota", email: "bota@seznam.cz", __v: 0 }
          // ];
          // componentInstance.persons = persons;
          // componentInstance.ngOnInit();
          fixture.detectChanges();

          let nativeElement = fixture.nativeElement;
          console.log(fixture.nativeElement);
          expect(1).toBeDefined();
          // basse controls
          // expect(componentInstance.persons).toBeDefined();
          // expect(componentInstance.persons.length).toBe(2);
        });
    })));
  });
});