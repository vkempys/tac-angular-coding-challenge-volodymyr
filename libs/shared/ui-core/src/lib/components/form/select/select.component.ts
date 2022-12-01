import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  Optional,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { CustomInputComponentAbstract, MakeProviders } from '../custom-input-component.abstract';

@Component({
  selector: 'tac-nx-shrd-uic-select',
  templateUrl: './select.component.html',
  providers: MakeProviders(SelectComponent),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends CustomInputComponentAbstract {

  @Input() placeholder = '';
  @Input() options: string[];

  get buttonId() {
    return `${this.inputId}-btn`
  }

  constructor(
    @Optional() @Host() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef
  ) {
    super(controlContainer, cdr);
  }

  applySelection(val: string): void {
    this.formControl.setValue(val);
  }

}
