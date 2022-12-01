import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { ActiveFormatModule, DateFormatModule } from '@tac/shared/util-core';

import { PeopleListComponent } from './pages/people-list/people-list-component';
import { PeopleEditLinkComponent } from './components/people-edit-link/people-edit-link-component';
import { PeopleTableComponent } from './components/people-table/people-table-component';
import { PeopleDeleteButtonComponent } from './components/people-delete-button/people-delete-button-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: PeopleListComponent }]),
    ActiveFormatModule,
    DateFormatModule,
    NgbModalModule
  ],
  declarations: [
    PeopleListComponent,
    PeopleEditLinkComponent,
    PeopleTableComponent,
    PeopleDeleteButtonComponent
  ]
})
export class PeopleFeatureListingModule {}
