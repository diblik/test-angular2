import {Component} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {PersonTableComponent} from './person-table.component';
import {Person} from '../entity/person';

// MOCK
let persons: Person[] = [
  { _id: '1', firstname: 'Tomáš', lastname: "Marný", email: "marny@seznam.cz", __v: 0 },
  { _id: '2', firstname: 'Ota', lastname: "Bota", email: "bota@seznam.cz", __v: 0 }
];

describe("PersonTableComponent", () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PersonTableComponent
      ]
    });
  });

  describe('check rendering', () => {
    it('if component is rendereds', async(() => {
      TestBed.compileComponents().then(() => {
        // vytvoreni komponenty
        let fixture = TestBed.createComponent(PersonTableComponent);
        let componentInstance = fixture.componentInstance;
       
        // nastaveni vstupnich hodnot
        componentInstance.persons = persons;
        componentInstance.selectedPerson = persons[1];
        let nativeElement = fixture.nativeElement;
        
        // reload componenty - z duvodu zmeny persons
        fixture.detectChanges();
        console.log(fixture.nativeElement);
        
        // basse controls
        expect(componentInstance.persons).toBeDefined;
        expect(componentInstance.persons.length).toBe(2);
        expect(componentInstance.selectedPerson).toBeDefined;

        // pocet radku je 3
        let trs  = nativeElement.querySelectorAll('tr')
        expect(trs.length).toBe(3);
        
        // prvni radek obsahuje Tomase
        let fistRowTd  = nativeElement.querySelector('tr td:nth-child(2)')
        expect(fistRowTd.innerText).toBe('Tomáš');

        // vybrany radek obsahuje Otu
        let activeTr  = nativeElement.querySelector('.active')
        let activeName = activeTr.querySelector('tr td:nth-child(2)')
        expect(activeName.innerText).toBe('Ota');

        // spravna reakce na kliknuti na prvni radek
        fistRowTd.click();
        fixture.detectChanges();
        console.log(fixture.nativeElement);
        activeTr  = nativeElement.querySelector('.active')
        activeName = activeTr.querySelector('tr td:nth-child(2)')
        expect(activeName.innerText).toBe('Tomáš');
      });
    }));
  });
});

