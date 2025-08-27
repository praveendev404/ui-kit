import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';

declare let ResizeObserver: any;

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[libScroller]',
    template: `
        <div #container class="scroller-container">
            <ng-content></ng-content>
        </div>
        <div
            *ngIf="!lisScrollerDisabled"
            #actions
            class="scroller-actions"
            [style.--size]="libScrollerSize + 'px'"
        >
            <div class="position-absolute start-arrow">
                <fa-icon
                    icon="facArrowUpInCircle"
                    class="d-flex"
                    (click)="shift(-scrollStep)"
                ></fa-icon>
            </div>
            <div class="position-absolute end-arrow">
                <fa-icon
                    icon="facArrowDownInCircle"
                    class="d-flex"
                    (click)="shift(scrollStep)"
                ></fa-icon>
            </div>
        </div>
    `,
    styleUrls: ['./scroller.component.scss'],
    standalone: false
})
export class ScrollerComponent {
    @Input() libScrollerSize = 14;

    @Input() libScrollerDir: 'horizontal' | 'vertical' = 'horizontal';

    @Input() lisScrollerDisabled = false;

    private observer: any;

    @ViewChild('container') container: ElementRef;
    @ViewChild('actions') actions: ElementRef;

    scrollStep = 150;

    constructor(private zone: NgZone) {}

    shift(start: number): void {
        this.container.nativeElement.scrollBy({
            [this.libScrollerDir === 'horizontal' ? 'left' : 'top']: start,
            behavior: 'smooth'
        });
    }

    ngAfterViewInit() {
        if (this.lisScrollerDisabled) {
            return;
        }
        this.zone.runOutsideAngular(() => {
            this.observer = new ResizeObserver(() =>
                this.adjustButtonsVisibility()
            );
            this.observer.observe(this.container.nativeElement);
            this.container.nativeElement.onscroll = () =>
                this.adjustButtonsVisibility();
        });
        this.adjustButtonsVisibility();
    }

    private adjustButtonsVisibility() {
        const el = this.container.nativeElement;
        const firstChild = el.children.length ? el.children[0] : null;
        const overflow =
            this.libScrollerDir === 'horizontal'
                ? el.scrollWidth - el.offsetWidth
                : el.scrollHeight - el.offsetHeight;
        const isOverflow = overflow > 0;
        this.actions.nativeElement.hidden = !isOverflow;
        if (firstChild) {
            const newScrollStep =
                this.libScrollerDir === 'horizontal'
                    ? firstChild.offsetWidth
                    : firstChild.offsetHeight;

            if (newScrollStep > 0) {
                this.scrollStep = newScrollStep;
            }
        }

        el.classList.remove(
            'scroller-container--start',
            'scroller-container--end'
        );
        if (!isOverflow) {
            return;
        }

        const start = Math.floor(
            this.libScrollerDir === 'horizontal' ? el.scrollLeft : el.scrollTop
        );
        if (start === 0) {
            el.classList.add('scroller-container--start');
        } else if (start + 1 >= overflow) {
            el.classList.add('scroller-container--end');
        }
    }

    ngOnDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    }
}
