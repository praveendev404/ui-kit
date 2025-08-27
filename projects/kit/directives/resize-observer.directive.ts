import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';

declare let ResizeObserver: any;

@Directive({
    selector: '[libResizeObserver]',
    standalone: false
})
export class ResizeObserverDirective implements OnInit, OnDestroy {
    @Input() libResizeObserverDisable = false;

    @Output() libResizeObserver = new EventEmitter();

    private observer: any;

    @Input() resizeObserverSelectorFn: (host: Element) => Element = (
        host: Element
    ) => host;

    constructor(private elRef: ElementRef, private zone: NgZone) {}

    ngOnInit() {
        if (this.libResizeObserverDisable) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.observer = new ResizeObserver(() =>
                this.libResizeObserver.emit()
            );
            this.observer.observe(
                this.resizeObserverSelectorFn(this.elRef.nativeElement)
            );
        });
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}

@NgModule({
    declarations: [ResizeObserverDirective],
    exports: [ResizeObserverDirective]
})
export class ResizeObserverModule {}
