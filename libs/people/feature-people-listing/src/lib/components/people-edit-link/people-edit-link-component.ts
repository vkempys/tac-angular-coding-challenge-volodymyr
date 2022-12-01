import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PeopleRoutes } from '@tac/shared/commmon-types'; 
import { Person } from '@tac/people/data-access';

@Component({
  selector: 'tac-nx-ppl-edit-link',
  templateUrl: './people-edit-link-component.html',
  styleUrls: ['./people-edit-link-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleEditLinkComponent {

  @Input() person: Person;
  
  readonly PeopleRoutes = PeopleRoutes;

  get state() {
    return { person: this.person };
  }
}