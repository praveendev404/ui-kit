import {
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Output
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[libResize]',
    standalone: false
})
export class ResizeDirective implements OnInit, OnDestroy {
    @Input() defaultHeight: number;
    @Input() parentItem: any;

    @Output() resizedEvent = new EventEmitter();

    height: number;
    oldY = 0;
    grabber = false;

    protected destroy$ = new Subject();

    constructor(private el: ElementRef) {}

    @HostListener('document:mouseup', ['$event'])
    onMouseUp(): void {
        this.grabber = false;
        this.destroy$.next();
    }

    @HostListener('mousedown', ['$event'])
    onResize(event: MouseEvent) {
        this.grabber = true;
        this.oldY = event.clientY;
        event.preventDefault();

        this.addMouseMoveListener();
    }

    ngOnInit() {
        this.height = parseInt(
            this.defaultHeight
                ? this.defaultHeight
                : this.parentItem?.offsetHeight,
            10
        );
    }

    resizer(offsetY: number): void {
        this.height -= offsetY;
        this.parentItem.style.height = this.height + 'px';
        this.resizedEvent.emit();
    }

    addMouseMoveListener(): void {
        fromEvent(document, 'mousemove')
            .pipe(takeUntil(this.destroy$))
            .subscribe(this.mouseMoveCallback.bind(this));
    }

    mouseMoveCallback(event: MouseEvent): void {
        if (!this.grabber) {
            return;
        }

        this.resizer(event.clientY - this.oldY);
        this.oldY = event.clientY;
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
