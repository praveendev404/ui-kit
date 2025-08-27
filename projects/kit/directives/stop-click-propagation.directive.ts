import { Directive, ElementRef, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Directive({
    selector: '[appStopClickPropagation]',
    standalone: false
})
export class StopClickPropagationDirective implements OnInit, OnDestroy {
    @Output() click = new EventEmitter();

    constructor(private elRef: ElementRef<HTMLElement>) {}

    ngOnInit() {
        this.elRef.nativeElement.addEventListener('click', this.clickHandler, true);
    }

    clickHandler = (e: any) => {
        e.stopPropagation();
        this.click.emit(e);
    };

    ngOnDestroy() {
        this.elRef.nativeElement.removeEventListener('click', this.clickHandler, true);
    }
}
