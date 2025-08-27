import { Store } from '@dagility-ui/kit';

class TestStore extends Store<any> {
    constructor(initialState) {
        super(initialState);
    }
}

describe('Store', () => {
    let stateHistory: TestStore;
    let fn: any;

    beforeEach(() => {
        stateHistory = new TestStore({});
        fn = () => {};
    });

    it('should be created', () => {
        expect(stateHistory).toBeTruthy();
    });

    it('state should return true', () => {
        spyOnProperty(stateHistory, 'value', 'get').and.returnValue(true);
        expect(stateHistory.state).toBeTrue();
    });

    it('dispatch call next with fn(true)', () => {
        spyOn(stateHistory, 'next').and.callThrough();
        spyOnProperty(stateHistory, 'value', 'get').and.returnValue(true);

        stateHistory.dispatch(fn);
        expect(stateHistory.next).toHaveBeenCalledWith(fn(true));
    });

    it('setState be called', () => {
        spyOn(stateHistory, 'setState').and.callThrough();
        spyOnProperty(stateHistory, 'value', 'get').and.returnValue({});
        stateHistory.setState({});
        expect(stateHistory.setState).toHaveBeenCalled();
    });

    it('select be called', () => {
        spyOn(stateHistory, 'select').and.callThrough();
        stateHistory.select(fn);
        expect(stateHistory.select).toHaveBeenCalledWith(fn);
    });

    it('selectSync be called', () => {
        spyOn(stateHistory, 'selectSync').and.callThrough();
        stateHistory.selectSync(fn);
        expect(stateHistory.selectSync).toHaveBeenCalledWith(fn);
    });
});
