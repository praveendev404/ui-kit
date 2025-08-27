import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { ModalBasicComponent } from './modal-basic/modal-basic.component';
import { ModalWithButtonsComponent } from './modal-with-buttons/modal-with-buttons.component';
import { ModalWithInputsComponent } from './modal-with-inputs/modal-with-inputs.component';
import { ModalBasicViewComponent } from './modal-basic/modal-basic-view/modal-basic-view.component';
import { ModalWithButtonsViewComponent } from './modal-with-buttons/modal-with-buttons-view/modal-with-buttons-view.component';
import { ModalWithInputsViewComponent } from './modal-with-inputs/modal-with-inputs-view/modal-with-inputs-view.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ModalWarningDemoComponent } from './modal-warning/modal-warning.component';

const DEMOS: Record<string, any> = {
    'modal-basic': {
        title: 'Modal',
        code: 'popups/modal-basic/modal-basic.component.ts',
        markup: 'popups/modal-basic/modal-basic.component.html',
        type: ModalBasicComponent,
    },
    'modal-with-buttons': {
        title: 'Modal With Buttons',
        code: 'popups/modal-with-buttons/modal-with-buttons.component.ts',
        markup: 'popups/modal-with-buttons/modal-with-buttons.component.html',
        type: ModalWithButtonsComponent,
    },
    'modal-with-inputs': {
        title: 'Modal With Inputs',
        code: 'popups/modal-with-inputs/modal-with-inputs.component.ts',
        markup: 'popups/modal-with-inputs/modal-with-inputs.component.html',
        type: ModalWithInputsComponent,
    },
    'modal-warning': {
        title: 'Modal Warning',
        code: 'popups/modal-warning/modal-warning.component.ts',
        markup: 'popups/modal-warning/modal-warning.component.html',
        type: ModalWarningDemoComponent,
    },
    tooltip: {
        title: 'Tooltip',
        code: 'popups/tooltip/tooltip.component.ts',
        markup: 'popups/tooltip/tooltip.component.html',
        type: TooltipComponent,
    },
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS },
            },
        ]),
    ],
    declarations: [
        ModalBasicComponent,
        ModalWithButtonsComponent,
        ModalWithInputsComponent,
        ModalBasicViewComponent,
        ModalWarningDemoComponent,
        ModalWithButtonsViewComponent,
        ModalWithInputsViewComponent,
        TooltipComponent,
    ],
    providers: [],
})
export class PopupsModule {}
