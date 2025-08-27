import { ComponentCanDeactivate, UnsavedDataGuard } from '@dagility-ui/kit';

describe('UnsavedDataGuard', () => {
    let unsavedDataGuard: UnsavedDataGuard;
    let component;

    beforeEach(() => {
        unsavedDataGuard = new UnsavedDataGuard({ open: () => {} } as any);
        component = {
            canDeactivate: () => {},
            beforeLeave: () => {},
            getWarning: () => ({
                title: 'someTitle',
                message: 'someMessage',
                warningMessage: 'someWarningMessage'
            })
        } as ComponentCanDeactivate;
    });

    it('should be created', () => {
        expect(unsavedDataGuard).toBeTruthy();
    });

    it('canDeactivate should be called', () => {
        spyOn(unsavedDataGuard, 'canDeactivate').and.callThrough();
        spyOn(unsavedDataGuard['modalService'], 'open').and.returnValue({
            result: Promise.resolve()
        } as any);

        unsavedDataGuard.canDeactivate(component);
        expect(unsavedDataGuard.canDeactivate).toHaveBeenCalled();
    });

    it('canDeactivate should be called with empty component', () => {
        spyOn(unsavedDataGuard, 'canDeactivate').and.callThrough();
        component = null;

        unsavedDataGuard.canDeactivate(component);
        expect(unsavedDataGuard.canDeactivate).toHaveBeenCalled();
    });

    it('canDeactivate should be called without beforeLeave', () => {
        spyOn(unsavedDataGuard, 'canDeactivate').and.callThrough();
        spyOn(unsavedDataGuard['modalService'], 'open').and.returnValue({
            result: Promise.resolve()
        } as any);
        delete component.beforeLeave;

        unsavedDataGuard.canDeactivate(component);
        expect(unsavedDataGuard.canDeactivate).toHaveBeenCalled();
    });

    it('canDeactivate should be called with error', () => {
        spyOn(unsavedDataGuard, 'canDeactivate').and.callThrough();
        spyOn(unsavedDataGuard['modalService'], 'open').and.returnValue({
            result: Promise.reject()
        } as any);

        unsavedDataGuard.canDeactivate(component);
        expect(unsavedDataGuard.canDeactivate).toHaveBeenCalled();
    });
});
