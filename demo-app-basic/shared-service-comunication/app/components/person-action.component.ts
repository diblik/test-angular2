import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Person } from '../entity/person';
import { PersonSharedService } from './person-shared.service';
import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";

@Component({
    selector: 'person-action',
    templateUrl: 'app/components/person-action.component.html'
})

export class PersonActionComponent {
    private enableDeleteButton = true; 
    private enableSaveButton = true;

    constructor(private personSharedService: PersonSharedService) {
        console.log("PersonActionComponent => getSelectedPerson() - register");
        personSharedService.getSelectedPerson().subscribe(person  => {
            this.enableDeleteButton = person != null;
            this.enableSaveButton = person != null

            // je vybranna nova tj. jeste neulozena osoba 
            if(person != null && person._id == null){
               this.enableDeleteButton = false;
            }
            console.debug("PersonActionComponent => getSelectedPerson() - invoke", person);
        });
    }   
}