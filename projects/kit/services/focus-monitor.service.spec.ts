import { FocusMonitor } from '@dagility-ui/kit';
import { NgZone } from '@angular/core';

describe('FocusMonitor', () => {
    let testClass: FocusMonitor;

    beforeEach(() => {
        testClass = new FocusMonitor(new NgZone({}));
    });

    it('should be created', () => {
        expect(testClass).not.toBeNull();
    });

    it('monitor$ should be called', () => {
        spyOn(testClass, 'monitor$').and.callThrough();
        testClass
            .monitor$(document.createElement('div'))
            .subscribe(value => console.log(value));
        expect(testClass.monitor$).toHaveBeenCalled();
    });

    it('contains should be called', () => {
        spyOn<any>(testClass, 'contains').and.callThrough();
        const param = { contains: () => {} } as any;
        testClass['contains'](param, param);
        expect(testClass['contains']).toHaveBeenCalledWith(param, param);
    });

    it('getActualTarget should be called', () => {
        spyOn<any>(testClass, 'getActualTarget').and.callThrough();
        const param = { composedPath: () => [] } as any;
        testClass['getActualTarget'](param);
        expect(testClass['getActualTarget']).toHaveBeenCalledWith(param);
    });

    it('isNativeFocused should be called', () => {
        spyOn<any>(testClass, 'isNativeFocused').and.callThrough();
        const param = { ownerDocument: {} } as any;
        testClass['isNativeFocused'](param);
        expect(testClass['isNativeFocused']).toHaveBeenCalledWith(param);
    });

    it('getNativeFocused should be called', () => {
        spyOn<any>(testClass, 'getNativeFocused').and.callThrough();
        testClass['getNativeFocused'](document);
        expect(testClass['getNativeFocused']).toHaveBeenCalledWith(document);
    });

    it('getNativeFocused should be called with null', () => {
        spyOn<any>(testClass, 'getNativeFocused').and.callThrough();
        const param = {
            activeElement: { shadowRoot: { activeElement: { shadowRoot: {} } } }
        } as any;
        testClass['getNativeFocused'](param);
        expect(testClass['getNativeFocused']).toHaveBeenCalledWith(param);
    });
});
