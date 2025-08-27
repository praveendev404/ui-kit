import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { throttleTime, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[throttledClick]',
    standalone: false
})
export class ThrottledClickDirective implements OnInit, OnDestroy {
    @Input()
    throttleTime = 500;

    @Output()
    throttledClick = new EventEmitter<MouseEvent>();

    private clicks$ = new Subject<MouseEvent>();
    private destroyed$ = new Subject();

    constructor() { }

    ngOnInit() {
        this.clicks$.pipe(
            takeUntil(this.destroyed$),
            throttleTime(this.throttleTime)
        ).subscribe(e => this.throttledClick.emit(e));
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }

    @HostListener('click', ['$event'])
    clickEvent(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks$.next(event);
    }
}
