import { ElementRef, Host, Injectable, NgZone, OnDestroy } from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { delay, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { ZoneFreeOperator } from '../../operators/zone-free';

const PANEL_OPENED_CLASS = 'opened-panel';

@Injectable()
export class DaAccordionService implements OnDestroy {
    private destroyed$ = new Subject();

    constructor(
        @Host() private accordion: NgbAccordion,
        private elementRef: ElementRef<HTMLElement>,
        zone: NgZone
    ) {
        accordion.panelChange
            .pipe(delay(0), takeUntil(this.destroyed$))
            .lift(new ZoneFreeOperator(zone))
            .subscribe(() => this.updateAccordionHeaderStyles());
    }

    updateAccordionHeaderStyles() {
        this.accordion.panels.forEach(panel => {
            const panelElement = this.elementRef.nativeElement.querySelector(
                `[id="${panel.id}-header"]`
            ).parentElement;

            panelElement.classList.toggle(PANEL_OPENED_CLASS, panel.isOpen);
        });
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
