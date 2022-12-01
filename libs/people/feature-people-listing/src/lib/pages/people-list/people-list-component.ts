import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Person } from '@tac/people/data-access';

import { PeopleListService } from '../../services/people-list.service';

@Component({
  selector: 'tac-nx-ppl-list',
  templateUrl: './people-list-component.html',
  styleUrls: ['./people-list-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PeopleListComponent implements OnInit {
  peopleList: Person[] = [];

  constructor(
    private readonly peopleListService: PeopleListService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  deletePerson(personId: string) {
    this.peopleListService.deletePerson(personId)
      .subscribe(() => this.loadPeople());
  }

  private loadPeople(): void {
    this.peopleListService.getPeopleList()
      .subscribe(data => {
        this.peopleList = data;
        this.cdr.markForCheck();
      });
  }
}