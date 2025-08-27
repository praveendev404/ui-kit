import {
    AfterViewInit,
    ComponentFactoryResolver,
    Directive,
    Injector
} from '@angular/core';

import { AccordionFirstLevelStylesComponent } from './accordion-first-level-styles/accordion-first-level-styles.component';
import { DaAccordionService } from './da-accordion.service';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ngb-accordion[firstLevel]',
    providers: [DaAccordionService],
    standalone: false
})
export class AccordionFirstLevelDirective implements AfterViewInit {
    constructor(
        resolver: ComponentFactoryResolver,
        injector: Injector,
        private accordionService: DaAccordionService
    ) {
        resolver
            .resolveComponentFactory(AccordionFirstLevelStylesComponent)
            .create(injector);
    }

    ngAfterViewInit() {
        this.accordionService.updateAccordionHeaderStyles();
    }
}
