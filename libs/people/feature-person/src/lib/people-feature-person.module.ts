import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PeopleRoutes } from '@tac/shared/commmon-types';
import { PeopleUiModule } from '@tac/people/ui';

import { PersonUpdateComponent } from './components/person-update/person-update-component';
import { PersonEditPageComponent } from './pages/person-edit/person-edit-component';
import { PersonDetailsPageComponent } from './pages/person-details/person-details-component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: PeopleRoutes.EDIT, component: PersonEditPageComponent },
      { path: '', pathMatch: 'full', component: PersonDetailsPageComponent }
    ]),
    PeopleUiModule
  ],
  declarations: [
    PersonUpdateComponent,
    PersonDetailsPageComponent,
    PersonEditPageComponent
  ]
})
export class PeopleFeaturePersonModule {}
