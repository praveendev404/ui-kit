import { Component } from '@angular/core';
import { GridColumn } from '@dagility-ui/kit';
import { Observable } from 'rxjs';
import { DataGridService } from '../services/data-grid.service';
import { delay } from 'rxjs/operators';

const GRID_COLUMN = [
    { title: 'Header Name', width: '50%' },
    { title: 'Header Name', width: '50%' }
];

@Component({
    selector: 'app-data-grid-with-api',
    templateUrl: './data-grid-with-api.component.html',
    standalone: false
})
export class DataGridWithApiComponent {
    gridColumns: GridColumn[] = GRID_COLUMN;

    gridData$: Observable<any>;

    constructor(private dataGridService: DataGridService) {
        this.gridData$ = dataGridService.getGridData().pipe(delay(5000));
    }
}
