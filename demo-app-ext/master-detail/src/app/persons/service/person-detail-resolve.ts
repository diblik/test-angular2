import { PersonService } from './person-service';
import { Person } from '../model/person';
import { Injectable }             from '@angular/core';
import { Router, Resolve,
         ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class PersonDetailResolve implements Resolve<Person> {
  constructor(private personService: PersonService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Promise<Person>|boolean {
    let id = route.params['id'];

    return this.personService.getPerson(id).then(person => {
      if (person) {
        return person;
      } else { // id not found
        this.router.navigate(['/persons']);
        return false;
      }
    });
  }
}
