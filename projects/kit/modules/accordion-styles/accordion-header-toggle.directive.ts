import { Directive } from '@angular/core';
import {
    NgbAccordion,
    NgbPanel,
    NgbPanelToggle
} from '@ng-bootstrap/ng-bootstrap';

@Directive({
    selector: '[libHeaderToggle]',
    host: {
        '[disabled]': 'panel.disabled'
    },
    standalone: false
})
export class AccordionHeaderToggleDirective extends NgbPanelToggle {
    constructor(public accordion: NgbAccordion, public panel: NgbPanel) {
        super(accordion, panel);
    }
}
