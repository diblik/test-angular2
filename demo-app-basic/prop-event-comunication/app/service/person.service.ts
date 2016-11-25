import { Injectable } from '@angular/core';
import { Person } from '../entity/person';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
  private personsUrl = 'http://d:58090/api/persons'

  constructor(private http: Http) { }

  /**
   * GET                 /api/persons                 list osob
   */
  getPersons(): Promise<Person[]> {
    console.log("getPersons");
    return this.http.get(this.personsUrl)
      .toPromise()
      .then(response => response.json() as Person[])
      .catch(this.handleError);
  }

  /**
   * GET                 /api/persons/:id            vrátí záznam osoby pro dané id
   */
  getPerson(id: string): Promise<Person> {
    console.log("getPerson", id);
    return this.http.get(this.personsUrl + "/" + id)
      .toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  /**
   * DELETE           /api/persons/:id            vymaže záznam osoby pro dané id
   */
  deletePerson(person: Person): Promise<Boolean> {
    console.log("deletePerson", person);
    return this.http.delete(this.personsUrl + "/" + person._id).toPromise()
      .then(response => response.ok as Boolean)
      .catch(this.handleError);
  }

  /**
   * ulozi nebo vytvori novou osobu
   * PUT                /api/persons/:id            aktualizuje záznam osoby pro dané id
   * POST               /api/persons                vytvoří nový záznam osoby
   */
  savePerson(person: Person): Promise<Person> {
    console.log("savePerson", person);
    if (person._id == null) {
      return this.createPerson(person);
    }
    return this.updatePerson(person);
  }

  /**
  * PUT                  /api/persons/:id            aktualizuje záznam osoby pro dané id
  */
  updatePerson(person: Person): Promise<Person> {
    console.log("updatePerson", person);
    let body = JSON.stringify(person);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.personsUrl + "/" + person._id, body, options).toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  /**
   * POST               /api/persons                 vytvoří nový záznam osoby
   */
  createPerson(person: Person): Promise<Person> {
    console.log("createPerson", person);
    let body = JSON.stringify(person);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.personsUrl, body, options).toPromise()
      .then(response => response.json() as Person)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}