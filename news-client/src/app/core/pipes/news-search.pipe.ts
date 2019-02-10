import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'newsSearch'})

export class NewsSearchPipe implements PipeTransform {
  public transform(list, searchValue: string) {
    if (!list) {
      return;
    }
    return list.filter(item => {
      if (item.title.search(new RegExp(searchValue.trim(), 'i')) !== -1 ) {
        return true;
      }
    });
  }
}
