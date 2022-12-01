import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activeFormat',
})
export class ActiveFormatPipe implements PipeTransform {
  transform(isActive: boolean) {
    return isActive ? 'Is Active' : 'Disabled';
  }
}