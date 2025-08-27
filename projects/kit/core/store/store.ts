import {BehaviorSubject, Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';

export abstract class Store<T> extends BehaviorSubject<T> {
    protected constructor(initialState: T) {
        super(initialState);
    }

    get state() {
        return this.value;
    }

    dispatch(fn: (state: T) => T) {
        this.next(fn(this.value));
    }

    setState(partialState: Partial<T>) {
        const nextState = { ...this.value, ...partialState };

        this.next(nextState);
    }

    select<R>(fn: (state: T) => R): Observable<R> {
        return this.pipe(
            map<T, R>(fn),
            distinctUntilChanged()
        );
    }

    selectSync<R>(fn: (state: T) => R): R {
        return fn(this.value);
    }
}
