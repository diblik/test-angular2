import {Component, OnInit, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

@Component({
  selector: 'app-genders',
  templateUrl: './genders.component.html',
  styleUrls: ['./genders.component.css'],
  // registrace komponenty (ControlValueAccessor nestaci jelikoz se pri transpilaci zahodi)
  // extend the multi-provider for NG_VALUE_ACCESSOR
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      // forwardRef takes a function as a parameter that returns a class
      // GendersComponent muze byt v tento moment undefined
      useExisting: forwardRef(() => GendersComponent),
      multi: true
    }
  ]
})
// postupovano dle navodu http://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
export class GendersComponent implements OnInit, ControlValueAccessor {
  @Input()
  value: string;
  propagateChange = (_: any) => {};

  constructor() {
  }

  ngOnInit() {
  }

  onChange(value: any){
    this.value = value;
    this.propagateChange(this.value);
  }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

}
