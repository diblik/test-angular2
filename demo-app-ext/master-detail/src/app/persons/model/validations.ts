import {Validators, FormControl} from "@angular/forms";

export interface IValidations {
  name: string;
  message: string;
  validator: Validators;
}

export abstract class Validations {

  abstract getValidations(): {[id: string]: IValidations[]};

  public getValidators(fieldName: string): Validators {
    let val: IValidations[] = this.getValidations()[fieldName];
    // console.log(val);
    let listOfVal = [];
    for (let perVal of val) {
      listOfVal.push(perVal.validator);
    }
    return Validators.compose(listOfVal);
  }

  public getMessage(fieldName: string, validKey: string): string {
    let val: IValidations[] = this.getValidations()[fieldName];
    for (let perVal of val) {
      if (perVal.name === validKey) {
        return perVal.message;
      }
    }
    return '';
  }
}
