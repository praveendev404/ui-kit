import { Component } from '@angular/core';
import { GridColumn, Pageable } from '@dagility-ui/kit';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
    selector: 'app-data-grid-with-drag-rows',
    templateUrl: './data-grid-with-drag-rows.component.html',
    standalone: false
})
export class DataGridWithDragRowsComponent {
    gridData: any[] = GRID_DATA;

    gridData2: any[] = [...GRID_DATA];

    gridColumns: GridColumn[] = GRID_COLUMN;

    pageable: Pageable = new Pageable(0, 10, []);

    onDrop($event: CdkDragDrop<any>, i: number) {
        if ($event.previousContainer === $event.container) {
            moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
        } else {
            transferArrayItem(
                $event.previousContainer.data,
                $event.container.data,
                $event.previousIndex,
                $event.currentIndex,
            );
        }
    }
}
