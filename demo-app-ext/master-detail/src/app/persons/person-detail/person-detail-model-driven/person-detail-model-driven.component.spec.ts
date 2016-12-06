/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PersonDetailModelDrivenComponent } from './person-detail-model-driven.component';

describe('PersonDetailModelDrivenComponent', () => {
  let component: PersonDetailModelDrivenComponent;
  let fixture: ComponentFixture<PersonDetailModelDrivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailModelDrivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailModelDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
     component.ngOnInit();
  });

  it('should create a `FormGroup` comprised of `FormControl`s', () => {
      component.ngOnInit();
      expect(component.personForm instanceof FormGroup).toBe(true);
      
      component.personForm.controls['firstname'].setValue('Alena');
      expect(this.personForm.valid).toBe(true);

      component.personForm.controls['firstname'].setValue('Marta');
      expect(this.personForm.valid).toBe(false);
  });
});
