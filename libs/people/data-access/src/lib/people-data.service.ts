import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { DateTime } from "luxon";

import { EnvironmentService } from '@tac/shared/util-core';

import { PeopleListResponse, Person, PersonAPIFormat } from './types/people-list.types';

@Injectable({
  providedIn: 'root'
})
export class PeopleDataService {

  private readonly dateFormat = `yyyy-MM-dd'T'HH:mm:ss ZZ`;

  private readonly baseApiUrl = this.envService.peopleApiUrl;

  private originalPeopleList: PersonAPIFormat[];

  constructor(
    private readonly http: HttpClient,
    private readonly envService: EnvironmentService
  ) {
    this.transformPersonData = this.transformPersonData.bind(this);
  }

  getPeoples(): Observable<PeopleListResponse> {
    return this.http.get<PersonAPIFormat[]>(this.baseApiUrl)
      .pipe(
        tap(list => this.originalPeopleList = list),
        map(resp => {
          return resp.map((this.transformPersonData)).slice(0, 10)
        })
      );
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<PersonAPIFormat>(`${this.baseApiUrl}/${id}`)
      .pipe(
        tap(person => {
          this.originalPeopleList = this.originalPeopleList || [person];
        }),
        map(this.transformPersonData)
      );
  }

  updatePerson(person: Person): Observable<void> {
    const originalPerson = this.originalPeopleList.find(item => item.id === person.id);
    const { registered, ...payload } = person

    return this.http.put<void>(`${this.baseApiUrl}/${person.id}`, { ...originalPerson, ...payload });
  }

  deletePerson(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseApiUrl}/${id}`);
  }

  private transformPersonData(person: PersonAPIFormat): Person {
    const { id, age, about, gender, name, isActive, registered } = person;
    return {
      id,
      age,
      about,
      gender,
      name,
      isActive,
      registered: DateTime.fromFormat(registered, this.dateFormat).toJSDate()
    }
  }

}