import { Page } from './paging.models';

export class Pagination {
    page: number;
    totalPages: number;
    totalElements: number;
    pageSize: number;
    first: boolean;
    last: boolean;

    public static of(source: Page<any>): Pagination {
        let result = new Pagination();
        result.page = source.number;
        result.totalPages = source.totalPages;
        result.totalElements = source.totalElements;
        result.pageSize = source.size;
        result.first = source.number === 0;
        result.last = source.number + 1 >= source.totalPages;
        return result;
    }
}
