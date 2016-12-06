import { AbstractControl, ValidatorFn } from '@angular/forms';

export class TextValidators {

  static startWithA(): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (!c || !c.value || !c.value[0]) { return null; }
      if (c.value[0].toUpperCase() !== 'A') {
        return { 'startWithA': true };
      }
      return null;
    };
  }
}
