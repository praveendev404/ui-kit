import {
    ContentChildren,
    Directive,
    ElementRef,
    Input,
    NgModule,
    NgZone,
    OnDestroy,
    OnInit,
    QueryList
} from '@angular/core';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { identity } from 'rxjs';

@Directive({
    selector: '[libTooltipTruncatedElement]',
    standalone: false
})
export class TooltipTruncatedElementDirective {}

@Directive({
    selector: '[libTooltipWhenOverflow]',
    standalone: false
})
export class TooltipWhenOverflowDirective implements OnInit, OnDestroy {
    @Input() textElementSelectorFn: (
        host: Element
    ) => Element | Element[] = identity;

    @Input() hoverElementSelectorFn: (host: Element) => Element = identity;

    @Input() overflowEnabled: boolean = true;

    @ContentChildren(TooltipTruncatedElementDirective, {
        read: ElementRef,
        descendants: true
    })
    truncatedElements: QueryList<ElementRef>;

    private textElement: Element | Element[];
    private hoverElement: Element;

    constructor(
        private elRef: ElementRef<HTMLElement>,
        private tooltip: NgbTooltip,
        private zone: NgZone
    ) {}

    ngOnInit() {
        this.textElement = this.textElementSelectorFn(this.elRef.nativeElement);
        this.hoverElement = this.hoverElementSelectorFn(
            this.elRef.nativeElement
        );
        this.zone.runOutsideAngular(() => {
            this.hoverElement.addEventListener('mouseenter', this.onMouseEnter);
            this.hoverElement.addEventListener('mouseleave', this.onMouseLeave);
        });
    }

    private onMouseEnter = () => {
        this.textElement = this.textElementSelectorFn(this.elRef.nativeElement);
        if (
            !this.overflowEnabled ||
            (this.tooltip && this.isOverflow() && !this.tooltip.isOpen())
        ) {
            this.zone.run(() => {
                this.tooltip.open();
            });
        }
    };

    private onMouseLeave = () => {
        if (!this.overflowEnabled || (this.tooltip && this.tooltip.isOpen())) {
            this.zone.run(() => {
                this.tooltip.close();
            });
        }
    };

    private isOverflow() {
        if (this.truncatedElements?.length) {
            return this.truncatedElements.some(({ nativeElement }) =>
                elementIsOverflowed(nativeElement)
            );
        }

        return (Array.isArray(this.textElement)
            ? this.textElement
            : [this.textElement]
        ).some(element => elementIsOverflowed(element));
    }

    ngOnDestroy() {
        this.hoverElement?.removeEventListener('mouseenter', this.onMouseEnter);
        this.hoverElement?.removeEventListener('mouseleave', this.onMouseLeave);
    }
}

function elementIsOverflowed({ clientWidth, scrollWidth }: Element) {
    return clientWidth < scrollWidth;
}

@NgModule({
    declarations: [
        TooltipTruncatedElementDirective,
        TooltipWhenOverflowDirective
    ],
    exports: [TooltipTruncatedElementDirective, TooltipWhenOverflowDirective]
})
export class TooltipWhenOverflowModule {}
