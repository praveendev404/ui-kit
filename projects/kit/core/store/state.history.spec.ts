import { StateHistory } from './state.history';
import { Store } from './store';
import { Subject } from 'rxjs';

describe('StateHistory', () => {
    let stateHistory: StateHistory;

    function callEnable() {
        stateHistory['store'].next(false);
        stateHistory['store'].next(true);
        stateHistory.enable();
    }

    beforeEach(() => {
        stateHistory = new StateHistory(new Subject() as Store<any>);
    });

    it('should be created', () => {
        expect(stateHistory).toBeTruthy();
    });

    it('ignoreNext should assign skip to true', () => {
        stateHistory.ignoreNext();
        expect(stateHistory['skip']).toBeTrue();
    });

    it('enable should be called', () => {
        spyOn(stateHistory, 'enable').and.callThrough();
        stateHistory['history'] = {
            past: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        } as any;
        callEnable();

        expect(stateHistory.enable).toHaveBeenCalled();
    });

    it('enable should be called with skipUpdate', () => {
        spyOn(stateHistory, 'enable').and.callThrough();
        stateHistory['skipUpdate'] = true;
        callEnable();

        expect(stateHistory.enable).toHaveBeenCalled();
    });

    it('enable should be assign skip to false', () => {
        spyOn(stateHistory, 'enable').and.callThrough();
        stateHistory['skip'] = true;
        callEnable();

        expect(stateHistory['skip']).toBeFalse();
    });

    it('enable should be called with history.past.length !== options.bufferSize', () => {
        spyOn(stateHistory, 'enable').and.callThrough();
        stateHistory['history'] = {
            past: []
        } as any;
        callEnable();

        expect(stateHistory.enable).toHaveBeenCalled();
    });

    it('undo should be called', () => {
        spyOn(stateHistory, 'undo').and.callThrough();
        stateHistory.undo();
        expect(stateHistory.undo).toHaveBeenCalled();
    });

    it('undo should call update', () => {
        spyOn<any>(stateHistory, 'update').and.callThrough();
        spyOnProperty(stateHistory, 'hasPast', 'get').and.returnValue(true);
        stateHistory.undo();
        expect(stateHistory['update']).toHaveBeenCalled();
    });

    it('redo should be called', () => {
        spyOn(stateHistory, 'redo').and.callThrough();
        stateHistory.redo();
        expect(stateHistory.redo).toHaveBeenCalled();
    });

    it('redo should call update', () => {
        spyOn<any>(stateHistory, 'update').and.callThrough();
        spyOnProperty(stateHistory, 'hasFuture', 'get').and.returnValue(true);
        stateHistory.redo();
        expect(stateHistory['update']).toHaveBeenCalled();
    });

    it('destroy should be called', () => {
        spyOn<any>(stateHistory, 'update').and.callThrough();
        stateHistory['update']();
        expect(stateHistory['update']).toHaveBeenCalled();
    });

    it('destroy should be called', () => {
        spyOn(stateHistory, 'destroy').and.callThrough();
        stateHistory.destroy();
        expect(stateHistory.destroy).toHaveBeenCalled();
    });
});
