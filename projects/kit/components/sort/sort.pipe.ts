import { Pipe, PipeTransform } from '@angular/core';
import { sortArrayByFieldAndDirection } from '../../utils/utilities';
import { SortDirection } from '../../models/common.model';

@Pipe({
    name: 'sortArrayByFieldAndDir',
    pure: true,
    standalone: false
})
export class SortArrByKeyPipe implements PipeTransform {
    transform(array: any[], key: string, dir?: SortDirection): any {
        if (!dir) {
            return array;
        }

        return sortArrayByFieldAndDirection(array, key, dir);
    }
}
