import { FormGroup } from '@angular/forms';

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

    // Provide the set of valid validation messages
    // Stucture:
    // controlName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // controlName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    // Processes each control within a FormGroup
    // And returns a set of validation messages to display
    // Structure
    // controlName1: 'Validation Message.',
    // controlName2: 'Validation Message.'
    processMessages(container: FormGroup): { [key: string]: string } {
        let messages = {};
      console.log("processMessages", container)
        for (let controlKey in container.controls) {
          console.log("controlKey", controlKey)
            if (container.controls.hasOwnProperty(controlKey)) {
                let c = container.controls[controlKey];
              console.log("hasOwnProperty", c)
                // If it is a FormGroup, process its child controls.
                if (c instanceof FormGroup) {
                    let childMessages = this.processMessages(c);
                    Object.assign(messages, childMessages);
                    console.log("je to formgroup", childMessages)
                } else {
                  console.log("neni to formgroup")
                    // Only validate if there are validation messages for the control
                    if (this.validationMessages[controlKey]) {
                      console.log("jpro KK exist validationMessages")
                        messages[controlKey] = '';
                        if ((c.dirty || c.touched) && c.errors) {
                          console.log("hledam ...")
                            for (let messageKey in c.errors) {
                              console.log("messageKey", messageKey)
                                if (c.errors.hasOwnProperty(messageKey) &&
                                    this.validationMessages[controlKey][messageKey]) {
                                    messages[controlKey] += this.validationMessages[controlKey][messageKey];
                                  console.log("mam ji",  messages[controlKey])
                                }
                            }
                        }
                    }
                }
            }
        }
        return messages;
    }
}