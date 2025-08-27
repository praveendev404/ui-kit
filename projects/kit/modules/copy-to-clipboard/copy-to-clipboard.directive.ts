import {
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { fromEvent, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[copyToClipboard]',
    standalone: false
})
export class CopyToClipboardDirective implements OnDestroy {
    @Input('copyToClipboard') text: string;

    @Output() copied = new EventEmitter<void>();

    private destroyed$ = new Subject();

    constructor(zone: NgZone, { nativeElement }: ElementRef<HTMLElement>) {
        zone.runOutsideAngular(() => {
            fromEvent(nativeElement, 'click')
                .pipe(
                    switchMap(() => navigator.clipboard.writeText(this.text)),
                    takeUntil(this.destroyed$)
                )
                .subscribe(() => {
                    zone.run(() => this.copied.emit());
                });
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}

@NgModule({
    declarations: [CopyToClipboardDirective],
    imports: [CommonModule],
    exports: [CopyToClipboardDirective]
})
export class CopyToClipboardModule {}
