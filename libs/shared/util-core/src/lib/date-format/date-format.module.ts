import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DateFormatPipe } from './date-format.pipe';

@NgModule({
  declarations: [DateFormatPipe],
  imports: [CommonModule],
  exports: [DateFormatPipe]
})
export class DateFormatModule { }

export * from './date-format.pipe';
