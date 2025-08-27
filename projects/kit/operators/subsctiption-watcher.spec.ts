import { subscriptionWatcher } from '@dagility-ui/kit';
import { Subject } from 'rxjs';

class TestClass {
    subscriptionWatcher: any = subscriptionWatcher;
}

describe('SubscriptionWatcher', () => {
    let testClass: TestClass;

    beforeEach(() => {
        testClass = new TestClass();
    });

    it('subscriptionWatcher should be called', () => {
        spyOn(testClass, 'subscriptionWatcher').and.callThrough();
        testClass
            .subscriptionWatcher(() => {})(new Subject())
            .subscribe(fn => {
                console.log(fn);
            });
        expect(testClass.subscriptionWatcher).toHaveBeenCalled();
    });
});
