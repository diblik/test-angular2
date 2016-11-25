import { Component } from '@angular/core';
import { TestBed, async, fakeAsync, inject } from '@angular/core/testing';
import { PersonTableComponent } from './person-table.component';
import { PersonSharedService } from './person-shared.service';
import { Person } from '../entity/person';
import { PersonService, IPersonService } from '../service/person.service';
import { PersonServiceMock } from '../service/person.service.mock';

import '../../node_modules/zone.js/lib/zone-spec/async-test.js'

import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';

beforeEach(() => {
    TestBed.configureTestingModule({
        declarations: [
            PersonTableComponent
        ],
        providers: [{ provide: PersonService, useClass: PersonServiceMock }, PersonSharedService],
        imports: [FormsModule, HttpModule]
    });
});

describe("PersonTableComponent", () => {

    describe('check rendering', () => {

        beforeEach(async(() => {
            TestBed.compileComponents().catch(error => console.error(error));
        }));

        // async(inject([PersonService], (personService: PersonService) => {
        it('should create an instance', async(() => {

            var fixture = TestBed.createComponent(PersonTableComponent);
            expect(1).toBeDefined();
            setTimeout(() => {
                fixture.detectChanges();
                let componentInstance = fixture.componentInstance;
                let nativeElement = fixture.nativeElement;
                console.log(fixture.nativeElement);
                // expect(1).toBeDefined();

                // pocet radku je 3
                let trs = nativeElement.querySelectorAll('tr')
                expect(trs.length).toBe(3);

                // prvni radek obsahuje Tomase
                let fistRowTd = nativeElement.querySelector('tr td:nth-child(2)')
                expect(fistRowTd.innerText).toBe('Tomáš');

                // spravna reakce na kliknuti na prvni radek
                fistRowTd.click();
                fixture.detectChanges();
                console.log(fixture.nativeElement);
                let activeTr = nativeElement.querySelector('.active')
                let activeName = activeTr.querySelector('tr td:nth-child(2)')
                expect(activeName.innerText).toBe('Tomáš');

            }, 100);
        }));

    });
});

