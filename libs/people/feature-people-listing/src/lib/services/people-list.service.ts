import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PeopleDataService, PeopleListResponse } from '@tac/people/data-access';

@Injectable({
  providedIn: 'root'
})
export class PeopleListService {

  constructor(
    private readonly peopleDataService: PeopleDataService
  ) {}

  getPeopleList(): Observable<PeopleListResponse> {
    return this.peopleDataService.getPeoples();
  }

  deletePerson(id: string): Observable<void> {
    return this.peopleDataService.deletePerson(id);
  }
}
