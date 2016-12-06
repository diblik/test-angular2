/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PersonDetailPartiallyModelDrivenComponent } from './person-detail-partially-model-driven.component';

describe('PersonDetailPartiallyModelDrivenComponent', () => {
  let component: PersonDetailPartiallyModelDrivenComponent;
  let fixture: ComponentFixture<PersonDetailPartiallyModelDrivenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonDetailPartiallyModelDrivenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonDetailPartiallyModelDrivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
