import { Directive, EventEmitter, Input, Output } from '@angular/core';

import { SortOrder } from '../../models/pagination/paging.models';
import { SortDirection } from '../../models/common.model';

@Directive({
    selector: '[libSort]',
    exportAs: 'libSort',
    standalone: false
})
export class SortDirective {
    @Output() sortChange = new EventEmitter<Partial<SortOrder>>();

    @Input() active: string;
    @Input() direction: SortDirection = null;

    sort(sortable: SortOrder): void {
        if (this.active !== sortable.property) {
            this.active = sortable.property;
            this.direction = null;
        }

        this.direction = getNextSortDirection(this.direction);

        this.sortChange.emit({
            direction: this.direction,
            property: this.active
        });
    }
}

function getNextSortDirection(direction: SortDirection) {
    const directionCycle = getSortDirectionCycle(direction);
    let nextDirectionCycleIndex = directionCycle.indexOf(direction) + 1;

    if (nextDirectionCycleIndex >= directionCycle.length) {
        nextDirectionCycleIndex = 0;
    }

    return directionCycle[nextDirectionCycleIndex];
}

function getSortDirectionCycle(current: SortDirection): SortDirection[] {
    return ['ASC', 'DESC', null];
}
