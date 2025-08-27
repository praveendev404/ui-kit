import { Directive, ElementRef, EventEmitter, Input, Output } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[visibilityChanged]',
    standalone: false
})
export class VisibilityDirective {
    @Input() options: IntersectionObserverInit = {
        root: document.documentElement
    };
    @Output() visibilityChanged = new EventEmitter<boolean>();

    observer: IntersectionObserver;

    constructor({ nativeElement }: ElementRef) {
        this.observer = new IntersectionObserver(
            (entries) => {
                this.visibilityChanged.emit(entries.pop().isIntersecting);
            },
            this.options || {}
        );
        this.observer.observe(nativeElement);
    }

    ngOnDestroy() {
        this.observer.disconnect();
    }
}
