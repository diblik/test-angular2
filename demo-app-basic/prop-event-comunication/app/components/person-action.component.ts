import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Person } from '../entity/person';

@Component({
    selector: 'person-action',
    templateUrl: 'app/components/person-action.component.html'
})

export class PersonActionComponent {
  
    @Input()
    enableDeleteButton = true; 

    @Input()
    enableSaveButton = true; 

    @Output()
    onCreateEmit = new EventEmitter();

    @Output()
    onSaveEmit = new EventEmitter();

    @Output()
    onDeleteEmit = new EventEmitter();

    onCreate(): void {
        console.log("onCreate");
        this.onCreateEmit.emit();
    }

    onDelete(): void {
        console.log("onDelete");
        this.onDeleteEmit.emit();
    }

    onSave(): void {
        console.log("onSave");
        this.onSaveEmit.emit();
    }
}