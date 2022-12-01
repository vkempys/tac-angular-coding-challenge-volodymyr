import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: ':id',
        loadChildren: () => import('@tac/people/feature-person').then(m => m.PeopleFeaturePersonModule),
      },
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@tac/people/feature-people-listing').then(m => m.PeopleFeatureListingModule),
      }
    ])
  ]
})
export class PeopleFeatureModule {}