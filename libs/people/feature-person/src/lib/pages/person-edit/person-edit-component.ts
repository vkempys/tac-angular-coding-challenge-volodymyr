import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PeopleRoutes } from '@tac/shared/commmon-types';
import { Person } from '@tac/people/data-access';

import { PersonDataService } from '../../services/person-data.service';

@Component({
  selector: 'tac-nx-person-edit',
  templateUrl: './person-edit-component.html',
  styleUrls: ['./person-edit-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonEditPageComponent implements OnInit {

  person: Person;

  readonly PeopleRoutes = PeopleRoutes;

  constructor(
    private readonly personDataService: PersonDataService,
    private readonly activeRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPersonData();
  }

  onFormCancel() {
    this.router.navigate(['/', PeopleRoutes.BASE]);
  }

  onFormSubmit(form: FormData) {
    const updatedPerson = { ...this.person, ...form }
    console.log(updatedPerson);
    this.personDataService.updatePersonData(updatedPerson).subscribe(() => {
      this.router.navigate(['/', PeopleRoutes.BASE, updatedPerson.id ]);
    })
  }

  private getPersonData(): Observable<Person> {
    const stateData = history.state.person;
    const personId = this.activeRoute.snapshot.params['id'];
    return stateData
      ? of(stateData)
      : this.personDataService.getPersonData(personId)
  }

  private loadPersonData(): void {
    this.getPersonData()
      .subscribe(data => {
        this.person = data;
        this.cdr.markForCheck();
      })
  }
}