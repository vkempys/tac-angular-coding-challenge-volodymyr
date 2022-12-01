import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  Optional
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

import { CustomInputComponentAbstract, MakeProviders } from '../custom-input-component.abstract';

@Component({
  selector: 'tac-nx-shrd-uic-input',
  templateUrl: './input-field.component.html',
  providers: MakeProviders(InputFieldComponent),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputFieldComponent extends CustomInputComponentAbstract {


  @Input() placeholder = '';
  @Input() maxlength: number;
  @Input() min: number;
  @Input() max: number; 

  @Input()
  set type(type: string) {
    this.inputType = type;
    this.cdr.markForCheck();
  }
  get type() {
    return this.inputType;
  }

  private inputType = 'text';

  constructor(
    @Optional() @Host() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef
  ) {
    super(controlContainer, cdr);
  }

}
