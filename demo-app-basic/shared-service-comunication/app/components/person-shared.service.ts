import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { BehaviorSubject } from "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Person } from '../entity/person';
import { PersonService } from '../service/person.service';

@Injectable()
export class PersonSharedService {

    private persons: BehaviorSubject<Person[]> = new BehaviorSubject([]);
    private selectedPerson: BehaviorSubject<Person> = new BehaviorSubject(null);

    constructor(private personService: PersonService) {
        this.loadInitialData();
    }

    getPersons(): Observable<Person[]> {
        console.log("PersonSharedService.getPersons()");
        return this.persons.asObservable();
    }

    getSelectedPerson(): Observable<Person> {
        console.log("PersonSharedService.getSelectedPerson()");
        return this.selectedPerson.asObservable();
    }

    selectPerson(person: Person): void {
        console.log("PersonSharedService.selectPerson(person)", person);
        this.disableSelectedPerson();
        person.isSelected = true;
        this.selectedPerson.next(person);
    }

    disableSelectedPerson(): void {
        console.log("PersonSharedService.disableSelectedPerson()");
        if (this.selectedPerson.getValue() != null) {
            this.selectedPerson.getValue().isSelected = false;
            // pokud nasatavim false pro vybranou osobu tak je nutne provest "refresh" listu
            // aby posluchaci nacetli novy stav
            this.persons.publish();
        }
    }

    selectNewPerson(): void {
        console.log("PersonSharedService.selectNewPerson()");
        this.disableSelectedPerson();
        this.selectedPerson.next(new Person());
    }

    saveSelectedPerson(): void {
        console.log("PersonSharedService.saveSelectedPerson()");
        let selPerson = this.selectedPerson.getValue()
        let persons = this.persons.getValue();

        this.personService.savePerson(selPerson).then(person => {
            // pridavam jen nove osoby, zbytek se resi pres biding
            if (selPerson._id == null) {
                persons.push(person);
            }
            this.disableSelectedPerson();
            this.selectedPerson.next(null);
        });
    }

    deleteSelectedPerson(): void {
        console.log("PersonSharedService.deleteSelectedPerson()");
        let selPerson = this.selectedPerson.getValue()
        let persons = this.persons.getValue();

        this.personService.deletePerson(selPerson).then(response => {
            if (response) {
                var index = persons.indexOf(selPerson, 0);
                if (index > -1) {
                    persons.splice(index, 1);
                }
                this.disableSelectedPerson();
                this.selectedPerson.next(null);
            } else {
                console.error("Nedoslo ke smazani osoby. " + selPerson)
            }
        });
    }

    loadInitialData() {
        console.log("PersonSharedService.loadInitialData()");
        this.personService.getPersons().then(persons => {
            this.persons.next(persons);
        })
    }

}