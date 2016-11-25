import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import {Person} from "../model/person";

export interface IPersonService {
  getPersons(): Promise<Person[]>;
  getPerson(id: string): Promise<Person>;
  deletePerson(person: Person): Promise<Boolean>;
  savePerson(person: Person): Promise<Person>;
  updatePerson(person: Person): Promise<Person>;
  createPerson(person: Person): Promise<Person>;
}

@Injectable()
export class PersonService implements IPersonService {
  //private personsUrl = 'http://hndocker.oksystem.local:58090/api/persons'
  private personsUrl = 'http://wverbovskym:3000/api/persons'

  constructor(private http: Http) { }

  /**
   * GET                 /api/persons                 list osob
   */
  getPersons(): Promise<Person[]> {
    console.log("PersonService.getPersons()");
    return this.http.get(this.personsUrl)
      .toPromise()
      .then(response => {
        console.debug("PersonService.getPersons() return ", response.json());
        return response.json() as Person[]
      })
      .catch(this.handleError);
  }

  /**
   * GET                 /api/persons/:id            vrátí záznam osoby pro dané id
   */
  getPerson(id: string): Promise<Person> {
    console.log("PersonService.getPerson(id)", id);
    return this.http.get(this.personsUrl + "/" + id)
      .toPromise()
      .then(response => {
        console.debug("PersonService.getPerson(id) return ", response.json());
        return response.json() as Person
      })
      .catch(this.handleError);
  }

  /**
   * DELETE           /api/persons/:id            vymaže záznam osoby pro dané id
   */
  deletePerson(person: Person): Promise<Boolean> {
    console.log("PersonService.deletePerson(person)", person);
    return this.http.delete(this.personsUrl + "/" + person.id).toPromise()
      .then(response => {
        console.debug("PersonService.deletePerson(person) return ", response.ok);
        return response.ok as Boolean;
      })
      .catch(this.handleError);
  }

  /**
   * ulozi nebo vytvori novou osobu
   * PUT                /api/persons/:id            aktualizuje záznam osoby pro dané id
   * POST               /api/persons                vytvoří nový záznam osoby
   */
  savePerson(person: Person): Promise<Person> {
    console.log("PersonService.savePerson(person)", person);
    if (person.id == null) {
      return this.createPerson(person);
    }
    return this.updatePerson(person);
  }

  /**
  * PUT                  /api/persons/:id            aktualizuje záznam osoby pro dané id
  */
  updatePerson(person: Person): Promise<Person> {
    console.log("PersonService.updatePerson(person)", person);
    let body = JSON.stringify(person);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.personsUrl + "/" + person.id, body, options).toPromise()
      .then(response => {
        console.debug("PersonService.updatePerson(person) return ", response.json());
        return response.json() as Person;
      })
      .catch(this.handleError);
  }

  /**
   * POST               /api/persons                 vytvoří nový záznam osoby
   */
  createPerson(person: Person): Promise<Person> {
    console.log("PersonService.createPerson(person)", person);
    let body = JSON.stringify(person);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.personsUrl, body, options).toPromise()
      .then(response => {
        console.debug("PersonService.createPerson(person) return ", response.json());
        return response.json() as Person
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
