import { Component, OnInit } from '@angular/core';
import { GridColumn, Pageable, Pager, Pagination } from '@dagility-ui/kit';

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
    },
    {
        headerName1: 'Value 20',
        headerName2: 'Value 20'
    },
    {
        headerName1: 'Value 21',
        headerName2: 'Value 21'
    },
    {
        headerName1: 'Value 22',
        headerName2: 'Value 22'
    },
    {
        headerName1: 'Value 23',
        headerName2: 'Value 23'
    },
    {
        headerName1: 'Value 24',
        headerName2: 'Value 24'
    },
    {
        headerName1: 'Value 25',
        headerName2: 'Value 25'
    },
    {
        headerName1: 'Value 26',
        headerName2: 'Value 26'
    },
    {
        headerName1: 'Value 27',
        headerName2: 'Value 27'
    },
    {
        headerName1: 'Value 28',
        headerName2: 'Value 28'
    },
    {
        headerName1: 'Value 29',
        headerName2: 'Value 29'
    },
    {
        headerName1: 'Value 30',
        headerName2: 'Value 30'
    }
];

const GRID_COLUMNS = [
    { title: 'Header Name 1', field: 'headerName1', width: '110px' },
    { title: 'Header Name 2', field: 'headerName2', width: '110px' }
];

const PAGE = {
    totalElements: 20,
    totalPages: 2,
    numberOfElements: 10,
    size: 10,
    empty: false,
    first: true,
    last: false
};

@Component({
    selector: 'app-data-grid-with-pagination',
    templateUrl: './data-grid-with-pagination.component.html',
    standalone: false
})
export class DataGridWithPaginationComponent implements OnInit {
    dataSource: any[] = [];

    gridColumns: GridColumn[] = GRID_COLUMNS;

    gridData = GRID_DATA;

    pagination: Pagination;

    page = PAGE;

    pageable: Pageable = new Pageable(0, 10, []);

    ngOnInit(): void {
        this.getDataSource(0, 10);
        this.pagination = Pagination.of({
            ...this.page,
            number: 0,
            content: []
        });
    }

    getDataSource(pageNumber: number, size: number) {
        this.dataSource = this.gridData.slice(
            size * pageNumber,
            size + size * pageNumber
        );
    }

    onPageChange(data: Pager) {
        this.pageable.update(data);
        this.getDataSource(data.currentPage - 1, data.pageSize);
        this.pagination = Pagination.of({
            ...this.page,
            number: data.currentPage - 1,
            content: [],
            numberOfElements: data.pageSize,
            size: data.pageSize
        });
    }
}
