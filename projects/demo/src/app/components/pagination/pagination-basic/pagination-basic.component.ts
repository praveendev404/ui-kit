import { Component, OnInit } from '@angular/core';
import { Pagination } from '@dagility-ui/kit';

const PAGE = {
    totalElements: 100,
    totalPages: 10,
    numberOfElements: 10,
    size: 10,
    empty: false,
    first: true,
    last: false
};

@Component({
    selector: 'app-pagination-basic',
    templateUrl: './pagination-basic.component.html',
    standalone: false
})
export class PaginationBasicComponent implements OnInit {
    pagination: Pagination;

    page = PAGE;

    ngOnInit(): void {
        this.pagination = Pagination.of({
            ...this.page,
            number: 0,
            content: []
        });
    }
}
