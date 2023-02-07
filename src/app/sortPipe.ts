import { Pipe , PipeTransform  } from "@angular/core";

@Pipe({
  name: 'sortPipe'
 })

export class SortPipe implements PipeTransform {

    transform(array: Array<string>, key: string): Array<string> {

        if(key === undefined || key == '' ){
            return array;
        }

        var arr = key.split("-");
        var keyString = arr[0];   // string or column name to sort(name or age or date)
        var sortOrder = arr[1];   // asc or desc order
        var byVal = 1;


        array.sort((a: any, b: any) => {
                return (sortOrder === "asc") ? a[keyString] - b[keyString] : b[keyString] - a[keyString];
        });

        return array;

  }

}