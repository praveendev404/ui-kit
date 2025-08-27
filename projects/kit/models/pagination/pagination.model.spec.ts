import { Page, Pagination } from '@dagility-ui/kit';

describe('Pagination', () => {
    it('should be truthy', () => {
        const source = {
            number: 10,
            totalPages: 10,
            totalElements: 10,
            size: 10
        };
        expect(Pagination.of(source as Page<any>)).toBeTruthy();
    });
});
