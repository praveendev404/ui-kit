import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccordionSecondLevelDirective } from './accordion-second-level.directive';
import { AccordionSecondLevelStylesComponent } from './accordion-second-level-styles/accordion-second-level-styles.component';
import { AccordionFirstLevelDirective } from './accordion-first-level.directive';
import { AccordionFirstLevelStylesComponent } from './accordion-first-level-styles/accordion-first-level-styles.component';
import { AccordionHeaderToggleDirective } from './accordion-header-toggle.directive';

@NgModule({
    declarations: [
        AccordionSecondLevelDirective,
        AccordionSecondLevelStylesComponent,
        AccordionFirstLevelDirective,
        AccordionFirstLevelStylesComponent,
        AccordionHeaderToggleDirective,
    ],
    imports: [CommonModule],
    exports: [
        AccordionSecondLevelDirective,
        AccordionFirstLevelDirective,
        AccordionHeaderToggleDirective,
    ]
})
export class AccordionStylesModule {}
