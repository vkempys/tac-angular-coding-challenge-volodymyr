import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Optional
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { CustomInputComponentAbstract, MakeProviders } from '../custom-input-component.abstract';

@Component({
  selector: 'tac-nx-shrd-uic-checkbox',
  templateUrl: './checkbox.component.html',
  providers: MakeProviders(CheckboxComponent),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxComponent extends CustomInputComponentAbstract {
  constructor(
    @Optional() @Host() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef
  ) {
    super(controlContainer, cdr);
  }
}
