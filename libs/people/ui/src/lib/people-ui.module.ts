import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormModule } from '@tac/shared/ui-core';

import { PersonFormComponent } from './components/person-form/person-form-component';

@NgModule({
  imports: [
    CommonModule,
    FormModule
  ],
  declarations: [PersonFormComponent],
  exports: [PersonFormComponent]
})
export class PeopleUiModule {}
