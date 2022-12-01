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
  selector: 'tac-nx-shrd-uic-textarea',
  templateUrl: './textarea.component.html',
  providers: MakeProviders(TextareaComponent),
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent extends CustomInputComponentAbstract {

  @Input() placeholder = '';
  @Input() rows = 2;
  @Input() maxlength: number;

  constructor(
    @Optional() @Host() controlContainer: ControlContainer,
    cdr: ChangeDetectorRef,
  ) {
    super(controlContainer, cdr);
  }

}
