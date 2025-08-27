import { Component } from '@angular/core';
import {GridColumn} from '@dagility-ui/kit';

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
    { title: 'Header Name', width: '50%' },
    { title: 'Header Name', width: '50%' }
];

@Component({
    selector: 'app-data-grid-basic',
    templateUrl: './data-grid-basic.component.html',
    standalone: false
})
export class DataGridBasicComponent {
    gridData: any[] = GRID_DATA;

    gridColumns: GridColumn[] = GRID_COLUMN;
}
