import { Component } from '@angular/core';
import {GridColumn, Pageable} from '@dagility-ui/kit';

const GRID_DATA = [
    { headerName: 'Header 1', value: 'Value' },
    { headerName: 'Header 2', value: 'Value' },
    { headerName: 'Header 3', value: 'Value' },
    { headerName: 'Header 4', value: 'Value' },
    { headerName: 'Header 5', value: 'Value' },
    { headerName: 'Header 6', value: 'Value' },
    { headerName: 'Header 7', value: 'Value' },
    { headerName: 'Header 8', value: 'Value' }
];

const GRID_COLUMN = [
    { title: 'Header Name', width: '50%', sortingField: 'headerName' },
    { title: 'Header Name', width: '50%' }
];

@Component({
    selector: 'app-data-grid-with-sort',
    templateUrl: './data-grid-with-sort.component.html',
    standalone: false
})
export class DataGridWithSortComponent {
    gridData: any[] = GRID_DATA;

    gridColumns: GridColumn[] = GRID_COLUMN;

    pageable: Pageable = new Pageable(0, 10, [
        { direction: 'ASC', property: 'headerName' }
    ]);

    sortGrid(fieldName: string) {
        const order = this.pageable.orders
            ? this.pageable.orders.find(x => x.property === fieldName)
            : { property: fieldName, direction: 'ASC' };
        order.direction = order.direction === 'ASC' ? 'DESC' : 'ASC';
        if (order.direction === 'ASC') {
            this.gridData.sort((a: any, b: any) =>
                a[fieldName].localeCompare(b[fieldName])
            );
        } else {
            this.gridData.sort((a: any, b: any) =>
                b[fieldName].localeCompare(a[fieldName])
            );
        }
    }
}
