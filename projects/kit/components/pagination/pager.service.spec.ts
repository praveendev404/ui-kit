import { PagerService } from '@dagility-ui/kit';

describe('PagerService', () => {
    let pageService: PagerService;

    beforeEach(() => {
        pageService = new PagerService();
    });

    it('should be created', () => {
        expect(pageService).toBeTruthy();
    });

    it('getPage should be called', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(0, 0);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with initial values', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(0);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with currentPage > totalPages', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(0, 10, 5);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with currentPage <= totalPages', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(10, 1, 5);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with totalPages > 0', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(1, 10, 5);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with totalPages > 10', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(150, 5);
        expect(pageService.getPager).toHaveBeenCalled();
    });

    it('getPage should be called with currentPage > 6', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(150, 15);
        expect(pageService.getPager).toHaveBeenCalled();
    });


    it('getPage should be called with currentPage + 4 < totalPages', () => {
        spyOn(pageService, 'getPager').and.callThrough();
        pageService.getPager(150, 10);
        expect(pageService.getPager).toHaveBeenCalled();
    });
});
