import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PeopleRoutes } from '@tac/shared/commmon-types';

import { PageNotFoundComponent } from './page-not-foound.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: PeopleRoutes.BASE,
        loadChildren: () => import('@tac/people/feature').then(m => m.PeopleFeatureModule)
      },
      { path: '', redirectTo: `/${PeopleRoutes.BASE}`, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent },
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
