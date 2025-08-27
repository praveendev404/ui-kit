import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    mapTo,
    startWith,
    switchMap,
    take
} from 'rxjs/operators';

import { ZoneFreeOperator } from '../operators/zone-free';

@Injectable({
    providedIn: 'root'
})
export class HoveredService {
    private readonly documentEvents$: Observable<Event>;

    constructor(@Inject(DOCUMENT) documentRef: any, private zone: NgZone) {
        this.documentEvents$ = merge(fromEvent(documentRef, 'mousemove'));
    }

    createHovered$(target: Element, inElement = false) {
        return (inElement ? of({}) : fromEvent(target, 'mouseenter')).pipe(
            switchMap(() =>
                merge(
                    fromEvent(target, 'mouseleave'),
                    this.documentEvents$.pipe(
                        filter(
                            (event: Event) =>
                                !target.contains(this.getActualTarget(event))
                        ),
                        take(1)
                    )
                )
                    .pipe(mapTo(false), startWith(true), distinctUntilChanged())
                    .lift(new ZoneFreeOperator<boolean>(this.zone))
            )
        );
    }

    private getActualTarget(event: Event): Node {
        return (event as any).target;
    }
}
