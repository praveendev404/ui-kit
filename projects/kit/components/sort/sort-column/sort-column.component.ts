import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    HostListener,
    Input
} from '@angular/core';

import { SortDirective } from '../sort.directive';
import { SortOrder } from '../../../models/pagination/paging.models';
import { SortDirection } from '../../../models/common.model';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[sort-column]',
    templateUrl: './sort-column.component.html',
    styleUrls: ['./sort-column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SortColumnComponent implements SortOrder {
    @Input('sort-column') property: string;

    direction: SortDirection | null = null;

    @HostBinding('class.sort-active')
    get isSorted() {
        return this.sort.active === this.property && !!this.sort.direction;
    }

    get icon() {
        if (!this.isSorted) {
            return 'sortAsc';
        }

        return this.sort.direction === 'ASC' ? 'sortAsc' : 'sortDesc';
    }

    constructor(public sort: SortDirective) {}

    @HostListener('click')
    handleClick() {
        this.sort.sort(this);
    }
}
