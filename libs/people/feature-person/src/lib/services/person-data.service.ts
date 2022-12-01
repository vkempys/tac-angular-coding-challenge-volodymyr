import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeopleDataService, Person } from '@tac/people/data-access';

@Injectable({
  providedIn: 'root'
})
export class PersonDataService {

  constructor(
    private readonly peopleDataService: PeopleDataService
  ) {}

  getPersonData(id: string): Observable<Person> {
    return this.peopleDataService.getPerson(id);
  }

  updatePersonData(person: Person): Observable<void> {
    return this.peopleDataService.updatePerson(person);
  }
}
