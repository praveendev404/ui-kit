import { Component } from '@angular/core';
import { GridColumn } from '@dagility-ui/kit';

const GRID_COLUMN = [
    { title: 'Header Name', width: '50%', sortingField: 'headerName' },
    { title: 'Header Name', width: '50%' }
];

@Component({
    selector: 'app-data-grid-no-data',
    templateUrl: './data-grid-no-data.component.html',
    styleUrl: './data-grid-no-data.component.scss',
    standalone: false
})
export class DataGridNoDataComponent {
    readonly columns: GridColumn[] = GRID_COLUMN;
}
