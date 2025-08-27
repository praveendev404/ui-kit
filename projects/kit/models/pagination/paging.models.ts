import { HttpParams } from '@angular/common/http';

import { Pager } from './pager.model';
import { SortDirection } from '../common.model';

/**
 * spring Page response structure
 */
export interface Page<T> {
    /**
     * current page number, zero based
     */
    readonly number: number;

    /**
     * page size
     */
    readonly size: number;

    /**
     * page content
     */
    readonly content: T[];

    /**
     * the number of elements currently on this slice.
     */
    readonly numberOfElements: number;

    /**
     * total pages
     */
    readonly totalPages: number;

    /**
     * total elements
     */
    readonly totalElements: number;

    readonly empty: boolean;

    readonly first: boolean;

    readonly last: boolean;
}

/**
 * pageable request with paging and sorting support
 */
// @dynamic
export class Pageable {
    /**
     * page number, started from 0
     */
    public page: number;

    /**
     * page size, cannot be less then 1
     */
    public size: number;

    /**
     * sorting parameters
     */
    public orders?: SortOrder[] = [];

    public static page(page: number, size: number): Pageable {
        return new Pageable(page, size, []);
    }

    public static pageAndSort(
        direction: SortDirection,
        properties: string[],
        page: number,
        size: number
    ): Pageable {
        return new Pageable(
            page,
            size,
            properties.map(prop => new SortOrder(direction, prop))
        );
    }

    public add(params: HttpParams): HttpParams {
        params = params
            .set('page', this.page.toString())
            .set('size', this.size.toString());
        if (this.orders) {
            this.orders.forEach((order, idx) => {
                const value =
                    order.property +
                    ',' +
                    order.direction +
                    (order.ignoreCase ? ',ignore' : '');
                if (idx === 0) {
                    params = params.set('sort', value);
                } else {
                    params = params.append('sort', value);
                }
            });
        }
        return params;
    }

    public create(): HttpParams {
        return this.add(new HttpParams());
    }

    public constructor(page: number, size: number, orders: SortOrder[]) {
        this.page = page;
        this.size = size;
        this.orders = orders;
    }

    public update(data: Pager) {
        this.page = data.currentPage - 1;
        this.size = data.pageSize;
    }

    public setFirst(): void {
        this.page = 0;
    }

    sortOneField(property: string) {
        const order = this.orders
            ? this.orders.find(x => x.property === property)
            : null;
        if (order) {
            if (order.direction === 'DESC') {
                this.orders = this.orders.filter(item => item !== order);
            } else {
                order.direction = 'DESC';
            }
        } else {
            this.orders = [{ property: property, direction: 'ASC' }];
        }
    }

    addSortField(property: string) {
        const order = this.orders
            ? this.orders.find(x => x.property === property)
            : null;
        if (order) {
            if (order.direction === 'ASC') {
                order.direction = 'DESC';
            } else {
                this.orders = this.orders!.filter(x => x.property !== property);
            }
        } else {
            this.orders = [
                ...(this.orders || []),
                { property, direction: 'ASC' }
            ];
        }
    }

    public sorted(property: string): SortDirection | null {
        const order = this.orders
            ? this.orders.find(x => x.property === property)
            : null;
        return order ? order.direction : null;
    }
}

export class SortOrder {
    direction: SortDirection | null;
    property: string;
    ignoreCase?: boolean = false;
    constructor(
        direction: SortDirection | null,
        property: string,
        ignoreCase?: boolean
    ) {
        this.direction = direction;
        this.property = property;
        this.ignoreCase = ignoreCase;
    }
}
