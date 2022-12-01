import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(date: Date) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'MMM d, y, h:mm a');
  }
}
