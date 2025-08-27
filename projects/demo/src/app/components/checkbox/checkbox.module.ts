import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { RadioComponent } from './radio/radio.component';
import { SwitchComponent } from './switch/switch.component';
import { CheckboxSizeSComponent } from './checkbox-size-s/checkbox-size-s.component';
import { RadioSizeSComponent } from './radio-size-s/radio-size-s.component';
import { SwitchSizeSComponent } from './switch-size-s/switch-size-s.component';
import { RadioGroupComponent } from './radio-group/radio-group.component';

const DEMOS: Record<string, any> = {
    checkbox: {
        title: 'Normal Checkbox (Size M)',
        code: 'checkbox/checkbox/checkbox.component.ts',
        markup: 'checkbox/checkbox/checkbox.component.html',
        type: CheckboxComponent,
    },
    'checkbox-size-s': {
        title: 'Checkbox Size S',
        code: 'checkbox/checkbox-size-s/checkbox-size-s.component.ts',
        markup: 'checkbox/checkbox-size-s/checkbox-size-s.component.html',
        type: CheckboxSizeSComponent,
    },
    radio: {
        title: 'Radio (Size M)',
        code: 'checkbox/radio/radio.component.ts',
        markup: 'checkbox/radio/radio.component.html',
        type: RadioComponent,
    },
    'radio-size-s': {
        title: 'Radio Size S',
        code: 'checkbox/radio-size-s/radio-size-s.component.ts',
        markup: 'checkbox/radio-size-s/radio-size-s.component.html',
        type: RadioSizeSComponent,
    },
    switch: {
        title: 'Switch (Size M)',
        code: 'checkbox/switch/switch.component.ts',
        markup: 'checkbox/switch/switch.component.html',
        type: SwitchComponent,
    },
    'switch-size-s': {
        title: 'Switch Size S',
        code: 'checkbox/switch-size-s/switch-size-s.component.ts',
        markup: 'checkbox/switch-size-s/switch-size-s.component.html',
        type: SwitchSizeSComponent,
    },
    'radio-group': {
        title: 'Radio Group',
        code: 'radio-group/radio-group.component.ts',
        markup: 'radio-group/radio-group.component.html',
        type: RadioGroupComponent,
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
        CheckboxComponent,
        RadioComponent,
        SwitchComponent,
        CheckboxSizeSComponent,
        RadioSizeSComponent,
        SwitchSizeSComponent,
        RadioGroupComponent,
    ],
})
export class CheckboxModule {}
