import { Validator } from '@angular/forms';
import { Directive } from '@angular/core';
import { forwardRef, Attribute } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[startWithA][formControlName], [startWithA][formControl], [startWithA][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => StartWithADirective), multi: true }
  ]
})
export class StartWithADirective implements Validator {

  constructor() { }

  validate(c: AbstractControl): { [key: string]: any } {
    if (!c || !c.value || !c.value[0]) { return null; }
    if (c.value[0].toUpperCase() !== 'A') {
      return { 'startWithA': true };
    }
    return null;
  }

}
