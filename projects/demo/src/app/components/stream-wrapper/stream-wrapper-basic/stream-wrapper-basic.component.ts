import { Component } from '@angular/core';
import { BehaviorSubject, concat, Observable, of } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { GridColumn } from '@dagility-ui/kit';

const GRID_DATA = [
    {
        headerName1: 'Value 1',
        headerName2: 'Value 1'
    },
    {
        headerName1: 'Value 2',
        headerName2: 'Value 2'
    },
    {
        headerName1: 'Value 3',
        headerName2: 'Value 3'
    },
    {
        headerName1: 'Value 4',
        headerName2: 'Value 4'
    },
    {
        headerName1: 'Value 5',
        headerName2: 'Value 5'
    },
    {
        headerName1: 'Value 6',
        headerName2: 'Value 6'
    },
    {
        headerName1: 'Value 7',
        headerName2: 'Value 7'
    },
    {
        headerName1: 'Value 8',
        headerName2: 'Value 8'
    },
    {
        headerName1: 'Value 9',
        headerName2: 'Value 9'
    },
    {
        headerName1: 'Value 10',
        headerName2: 'Value 10'
    },
    {
        headerName1: 'Value 11',
        headerName2: 'Value 11'
    },
    {
        headerName1: 'Value 12',
        headerName2: 'Value 12'
    },
    {
        headerName1: 'Value 13',
        headerName2: 'Value 13'
    },
    {
        headerName1: 'Value 14',
        headerName2: 'Value 14'
    },
    {
        headerName1: 'Value 15',
        headerName2: 'Value 15'
    },
    {
        headerName1: 'Value 16',
        headerName2: 'Value 16'
    },
    {
        headerName1: 'Value 17',
        headerName2: 'Value 17'
    },
    {
        headerName1: 'Value 18',
        headerName2: 'Value 18'
    },
    {
        headerName1: 'Value 19',
        headerName2: 'Value 19'
    }
];

const GRID_COLUMNS = [
    { title: 'Header Name 1', field: 'headerName1', width: '110px' },
    { title: 'Header Name 2', field: 'headerName2', width: '110px' }
];

@Component({
    selector: 'app-stream-wrapper-basic',
    templateUrl: './stream-wrapper-basic.component.html',
    standalone: false
})
export class StreamWrapperBasicComponent {
    dataStream$: Observable<any> = of(GRID_DATA).pipe(delay(2000));

    gridColumns: GridColumn[] = GRID_COLUMNS;

    query$ = new BehaviorSubject('');

    longLivingStream$ = this.query$.pipe(
        switchMap(query =>
            concat(
                of({ type: 'start' }),
                of(
                    GRID_DATA.filter(item => item.headerName1.startsWith(query))
                ).pipe(delay(500))
            )
        )
    );
}
