import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: string, ...args: string[]): string {

    
    
    return args[1]+', '+args[0] ;
  }

}
