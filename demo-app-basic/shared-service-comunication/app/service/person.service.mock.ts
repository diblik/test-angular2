import { Injectable } from '@angular/core';
import { Person } from '../entity/person';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { IPersonService } from './person.service';

@Injectable()
/**
 * mock nemusi obsahovat vsedchny manipulace s daty jelikoz se zbytek deje pres data binding
 */
export class PersonServiceMock implements IPersonService {
  private counter = 3;
  private persons: Person[] = [
      { _id: '1', firstname: 'Tomáš', lastname: "Marný", email: "marny@seznam.cz", __v: 0, isSelected: false },
      { _id: '2', firstname: 'Ota', lastname: "Bota", email: "bota@seznam.cz", __v: 0, isSelected: false }
  ];

  getPersons(): Promise<Person[]> {
    console.log("PersonServiceMock.getPersons()");
    return Promise.resolve<Person[]>(this.persons);
  };

  deletePerson(person: Person): Promise<Boolean> { 
    console.log("PersonServiceMock.getdeletePerson()", person); 
    return Promise.resolve(true); 
  };

  savePerson(person: Person): Promise<Person> { 
    console.log("PersonServiceMock.savePerson()", person); 
    if(person._id == null){
      // simuluji vyplneni ID
      person._id = String(this.counter);
      this.persons.push(person);
      this.counter ++;
    }
    return Promise.resolve(person);  
  };

  // tyto funkce se nikde nevolaji
  getPerson(id: string): Promise<Person> { console.log("PersonServiceMock.getPerson()"); return null; };
  updatePerson(person: Person): Promise<Person> { console.log("PersonServiceMock.updatePerson()"); return null };
  createPerson(person: Person): Promise<Person> { console.log("PersonServiceMock.createPerson()"); return null };
}

