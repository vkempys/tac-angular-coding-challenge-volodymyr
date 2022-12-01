import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormElementComponent } from './form-element/form-element.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { SelectComponent } from './select/select.component';
import { TextareaComponent } from './textarea/textarea.component';

@NgModule({
  declarations: [
    InputFieldComponent,
    TextareaComponent,
    CheckboxComponent,
    FormElementComponent,
    SelectComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NgbDropdownModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    TextareaComponent,
    CheckboxComponent,
    FormElementComponent,
    SelectComponent,
  ]
})
export class FormModule { }

export * from './checkbox/checkbox.component';
export * from './form-element/form-element.component';
export * from './input-field/input-field.component';
export * from './select/select.component';
export * from './textarea/textarea.component';
