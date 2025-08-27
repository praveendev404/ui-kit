import { NgZone } from '@angular/core';
import { Observable, Observer, Operator, TeardownLogic } from 'rxjs';

export class ZoneFreeOperator<T> implements Operator<T, T> {
    constructor(private readonly zone: NgZone) {}

    call(observer: Observer<T>, source: Observable<T>): TeardownLogic {
        return this.zone.runOutsideAngular(() => source.subscribe(observer));
    }
}
