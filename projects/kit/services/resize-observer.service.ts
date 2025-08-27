import { ElementRef, Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, share } from 'rxjs/operators';

import { ZoneFreeOperator } from '../operators/zone-free';

declare let ResizeObserver: any;

@Injectable()
export class ResizeObserverService {
    constructor(private readonly zone: NgZone) {}

    observe$({ nativeElement }: ElementRef<HTMLElement>, dueTime = 300) {
        return new Observable(subscriber => {
            let observer: any;

            observer = new ResizeObserver(entries => {
                this.zone.run(() => {
                    subscriber.next(entries);
                });
            });
            observer.observe(nativeElement);

            return () => {
                observer.disconnect();
            };
        })
            .pipe(debounceTime(dueTime), share())
            .lift(new ZoneFreeOperator(this.zone));
    }
}
