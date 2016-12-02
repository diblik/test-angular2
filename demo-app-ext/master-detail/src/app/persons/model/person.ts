import {Validators, FormControl} from "@angular/forms";
import {Validations, IValidations} from "./validations";
import {Subject, Observable} from "rxjs";

export class Person {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  birthday: Date;
  gender: Number;
}

export class PersonValidations2 {

  public static validFirstname(observable: Observable<any>): Observable<{field: string, messages: string[]}> {
    return observable
      .map((value: any) => {
        let messages = []
        let field = 'firstname';
        let data = value[field];

        if (!data) {
          messages.push("Jméno se musí vyplnit.");
        } else if (data.length < 3) {
          messages.push("Zadejte minimálně 3 znaky.");
        }

        if (data.length >= 10) {
          messages.push("Zadejte maximálně 10 znaků.");
        }

        if (data && data[0].toUpperCase() !== 'A') {
          messages.push("Text musí začínat znakem \'a\' nebo \'A\'.");
        }

        return {field: field, messages: messages};
      });
  }
}

export class PersonValidations extends Validations {

  // custom valid
  private startWithA(fieldControl: FormControl): Validators {
    if (!fieldControl.value[0]) return null;
    return fieldControl.value[0].toUpperCase() === 'A' ? null : {startWithA: true};
  }

  getValidations(): {[id: string]: IValidations[]} {
    return {
      'firstname': [
        {name: 'required',  message: 'Jméno se musí vyplnit.',      validator: Validators.required},
        {name: 'minlength', message: 'Zadejte minimálně 3 znaky.',  validator: Validators.minLength(3)},
        {name: 'maxlength', message: 'Zadejte maximálně 10 znaků.', validator: Validators.maxLength(10)},
        {name: 'startWithA',message: 'Text musí začínat znakem \'a\' nebo \'A\'.', validator: this.startWithA },
      ],
      'lastname': [
        {name: 'required', message: 'Příjmení se musí vyplnit.', validator: Validators.required},
      ]
    }
  };
}
