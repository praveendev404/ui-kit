import {
    AfterViewInit,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    Host,
    Injector
} from '@angular/core';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';

import { AccordionSecondLevelStylesComponent } from './accordion-second-level-styles/accordion-second-level-styles.component';
import { DaAccordionService } from './da-accordion.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ngb-accordion[secondLevel]',
    providers: [DaAccordionService],
    standalone: false
})
export class AccordionSecondLevelDirective implements AfterViewInit {
    constructor(
        @Host() private accordion: NgbAccordion,
        private elementRef: ElementRef<HTMLElement>,
        private resolver: ComponentFactoryResolver,
        private injector: Injector,
        private accordionService: DaAccordionService
    ) {
        this.resolver
            .resolveComponentFactory(AccordionSecondLevelStylesComponent)
            .create(this.injector);
    }

    ngAfterViewInit() {
        this.accordionService.updateAccordionHeaderStyles();
    }
}
