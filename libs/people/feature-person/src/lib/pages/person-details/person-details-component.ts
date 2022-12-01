import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { PeopleRoutes } from '@tac/shared/commmon-types';
import { Person } from '@tac/people/data-access';

import { PersonDataService } from '../../services/person-data.service';

@Component({
  selector: 'tac-nx-person-details',
  templateUrl: './person-details-component.html',
  styleUrls: ['./person-details-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonDetailsPageComponent {

  personId = this.activeRoute.snapshot.params['id'];
  person$: Observable<Person> = this.personDataService.getPersonData(this.personId);

  readonly PeopleRoutes = PeopleRoutes;

  constructor(
    private readonly personDataService: PersonDataService,
    private readonly activeRoute: ActivatedRoute
  ) { }

}