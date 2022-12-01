import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Person } from '@tac/people/data-access';

@Component({
  selector: 'tac-nx-ppl-table',
  templateUrl: './people-table-component.html',
  styleUrls: ['./people-table-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleTableComponent {

  @Input() people: Person[] = [];
  @Output() deletePerson: EventEmitter<string> = new EventEmitter();

  trackBy(index: number, field: Person): string {
    return field.id;
  }
}