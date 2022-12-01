import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ActiveFormatPipe } from './active-format.pipe';

@NgModule({
  declarations: [ActiveFormatPipe],
  imports: [CommonModule],
  exports: [ActiveFormatPipe]
})
export class ActiveFormatModule { }

export * from './active-format.pipe';
