import {Component, OnInit, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'app-extended-input',
  templateUrl: './extended-input.component.html',
  styleUrls: ['./extended-input.component.css']
})
export class ExtendedInputComponent implements OnChanges {
  @Input()
  labelText: string = '';
  @Input()
  inputErrors: any;
  @Input()
  errorDefs: any;

  errorMessage: string = '';

  ngOnChanges(changes: any): void {
    var errors: any = changes.inputErrors.currentValue;
    this.errorMessage = '';
    if (errors) {
      Object.keys(this.errorDefs).some(key => {
        if (errors[key]) {
          this.errorMessage = this.errorDefs[key];
          return true;
        }
      });
    }
  }
}
