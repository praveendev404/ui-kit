import { Pageable, Pager, SortOrder } from '@dagility-ui/kit';

describe('PagingModels', () => {
    let pageable: Pageable;
    let sortOrder: SortOrder;

    beforeEach(() => {
        pageable = new Pageable(10, 10, []);
        sortOrder = new SortOrder('ASC', 'someProperty', true);
        pageable.orders = [
            {
                property: 'someProperty',
                direction: 'ASC',
                ignoreCase: true
            } as SortOrder,
            {
                property: 'someProperty',
                direction: 'DESC',
                ignoreCase: false
            } as SortOrder
        ];
    });

    it('should be created', () => {
        expect(pageable).toBeTruthy();
    });

    it('add should be called', () => {
        spyOn(pageable, 'add').and.callThrough();
        pageable.orders = null;
        pageable.add({
            set: function() {
                return this;
            },
            append: () => {}
        } as any);

        expect(pageable.add).toHaveBeenCalled();
    });

    it('add should be called with orders', () => {
        spyOn(pageable, 'add').and.callThrough();
        pageable.add({
            set: function() {
                return this;
            },
            append: () => {}
        } as any);

        expect(pageable.add).toHaveBeenCalled();
    });

    it('create should be called', () => {
        spyOn(pageable, 'create').and.callThrough();
        pageable.create();
        expect(pageable.create).toHaveBeenCalled();
    });

    it('page should be called', () => {
        spyOn(Pageable, 'page').and.callThrough();
        Pageable.page(1, 2);
        expect(Pageable.page).toHaveBeenCalledWith(1, 2);
    });

    it('pageAndSort should be called', () => {
        spyOn(Pageable, 'pageAndSort').and.callThrough();
        Pageable.pageAndSort('ASC', ['someProperty'], 0, 0);
        expect(Pageable.pageAndSort).toHaveBeenCalled();
    });

    it('update should be called and assign page and size to 0', () => {
        pageable.update({ currentPage: 1, pageSize: 0 } as Pager);
        expect(pageable.page).toBe(0);
        expect(pageable.size).toBe(0);
    });

    it('setFirst should be called and assign page to 0', () => {
        pageable.setFirst();
        expect(pageable.page).toBe(0);
    });

    it('sortOneField should be called', () => {
        spyOn(pageable, 'sortOneField').and.callThrough();
        pageable.sortOneField('someProperty');
        expect(pageable.sortOneField).toHaveBeenCalled();
    });

    it('sortOneField should be called with another orders', () => {
        spyOn(pageable, 'sortOneField').and.callThrough();
        pageable.orders = [
            {
                property: 'someProperty',
                direction: 'DESC',
                ignoreCase: false
            } as SortOrder
        ];

        pageable.sortOneField('someProperty');
        expect(pageable.sortOneField).toHaveBeenCalled();
    });

    it('addSortField should be called without orders', () => {
        spyOn(pageable, 'sortOneField').and.callThrough();
        pageable.orders = null;

        pageable.sortOneField('someProperty');
        expect(pageable.sortOneField).toHaveBeenCalled();
    });

    it('addSortField should be called', () => {
        spyOn(pageable, 'addSortField').and.callThrough();
        pageable.addSortField('someProperty');
        expect(pageable.addSortField).toHaveBeenCalled();
    });

    it('addSortField should be called with another orders', () => {
        spyOn(pageable, 'addSortField').and.callThrough();
        pageable.orders = [
            {
                property: 'someProperty',
                direction: 'DESC',
                ignoreCase: false
            } as SortOrder
        ];

        pageable.addSortField('someProperty');
        expect(pageable.addSortField).toHaveBeenCalled();
    });

    it('addSortField should be called without orders', () => {
        spyOn(pageable, 'addSortField').and.callThrough();
        pageable.orders = null;

        pageable.addSortField('someProperty');
        expect(pageable.addSortField).toHaveBeenCalled();
    });

    it('addSortField should be called without orders', () => {
        spyOn(pageable, 'addSortField').and.callThrough();
        pageable.orders = null;

        pageable.addSortField('someProperty');
        expect(pageable.addSortField).toHaveBeenCalled();
    });

    it('sorted should be called', () => {
        spyOn(pageable, 'sorted').and.callThrough();
        pageable.sorted('someProperty');
        expect(pageable.sorted).toHaveBeenCalled();
    });

    it('sorted should be called without orders', () => {
        spyOn(pageable, 'sorted').and.callThrough();
        pageable.orders = null;
        pageable.sorted('someProperty');
        expect(pageable.sorted).toHaveBeenCalled();
    });

    it('sortOneField should sort in 3 modes: ASC, DESC and none', () => {
        pageable.orders = [];
        pageable.sortOneField('someProperty');
        expect(pageable.orders).toEqual([{ property: 'someProperty', direction: 'ASC' }]);
        pageable.sortOneField('someProperty');
        expect(pageable.orders).toEqual([{ property: 'someProperty', direction: 'DESC' }]);
        pageable.sortOneField('someProperty');
        expect(pageable.orders).toEqual([]);
    });
});
