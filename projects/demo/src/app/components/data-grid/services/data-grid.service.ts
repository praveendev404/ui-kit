import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

@Injectable()
export class DataGridService {
    getGridData(): Observable<any> {
        return of(GRID_DATA);
    }
}
