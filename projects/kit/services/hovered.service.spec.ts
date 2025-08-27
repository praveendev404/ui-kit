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
});
