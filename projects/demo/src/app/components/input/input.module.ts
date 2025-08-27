import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { InputBasicComponent } from './input-basic/input-basic.component';
import { InputWithValueComponent } from './input-with-value/input-with-value.component';
import { InputWithErrorComponent } from './input-with-error/input-with-error.component';
import { InputDisabledComponent } from './input-disabled/input-disabled.component';
import { InputWithMaxLengthComponent } from './input-with-max-length/input-with-max-length.component';
import { ReadonlyInputComponent } from './readonly-input/readonly-input.component';
import { InputSizeSComponent } from './input-size-s/input-size-s.component';
import { InputSizeLComponent } from './input-size-l/input-size-l.component';
import { InputNumberComponent } from './input-number/input-number.component';
import { InputWithMaxLengthErrorComponent } from './input-with-max-length-error/input-with-max-length-error.component';
import { InputWithCopyableComponent } from './input-copyable/input-with-copyable.component';
import { InlineInputComponent } from './inline-input/inline-input.component';

const DEMOS: Record<string, any> = {
    'input-basic': {
        title: 'Input (Size M)',
        code: 'input/input-basic/input-basic.component.ts',
        markup: 'input/input-basic/input-basic.component.html',
        type: InputBasicComponent
    },
    'input-size-s': {
        title: 'Input Size S',
        code: 'input/input-size-s/input-size-s.component.ts',
        markup: 'input/input-size-s/input-size-s.component.html',
        type: InputSizeSComponent
    },
    'input-size-l': {
        title: 'Input Size L',
        code: 'input/input-size-l/input-size-l.component.ts',
        markup: 'input/input-size-l/input-size-l.component.html',
        type: InputSizeLComponent
    },
    'input-with-value': {
        title: 'Input With Value',
        code: 'input/input-with-value/input-with-value.component.ts',
        markup: 'input/input-with-value/input-with-value.component.html',
        type: InputWithValueComponent
    },
    'input-with-error': {
        title: 'Input With Error',
        code: 'input/input-with-error/input-with-error.component.ts',
        markup: 'input/input-with-error/input-with-error.component.html',
        type: InputWithErrorComponent
    },
    'input-disabled': {
        title: 'Input Disabled',
        code: 'input/input-disabled/input-disabled.component.ts',
        markup: 'input/input-disabled/input-disabled.component.html',
        type: InputDisabledComponent
    },
    'input-with-max-length': {
        title: 'Input With Max Length',
        code: 'input/input-with-max-length/input-with-max-length.component.ts',
        markup: 'input/input-with-max-length/input-with-max-length.component.html',
        type: InputWithMaxLengthComponent
    },
    'input-with-max-length-and-error': {
        title: 'Input With Max Length And Error',
        code: 'input/input-with-max-length-error/input-with-max-length-error.component.ts',
        markup: 'input/input-with-max-length-error/input-with-max-length-error.component.html',
        type: InputWithMaxLengthErrorComponent
    },
    'readonly-input': {
        title: 'Readonly Input',
        code: 'input/readonly-input/readonly-input.component.ts',
        markup: 'input/readonly-input/readonly-input.component.html',
        type: ReadonlyInputComponent
    },
    'number-input': {
        title: 'Number Input',
        code: 'input/input-number/input-number.component.ts',
        markup: 'input/input-number/input-number.component.html',
        type: InputNumberComponent
    },
    'copyable-input': {
        title: 'Copyable Input',
        code: 'input/input-copyable/input-with-copyable.component.ts',
        markup: 'input/input-copyable/input-with-copyable.component.html',
        type: InputWithCopyableComponent
    },
    'inline-input': {
        title: 'Inline Input',
        code: 'input/inline-input/inline-input.component.ts',
        markup: 'input/inline-input/inline-input.component.html',
        type: InlineInputComponent
    }
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS }
            }
        ])
    ],
    declarations: [
        InputBasicComponent,
        InputWithValueComponent,
        InputWithErrorComponent,
        InputDisabledComponent,
        InputWithMaxLengthComponent,
        ReadonlyInputComponent,
        InputSizeSComponent,
        InputSizeLComponent,
        InputNumberComponent,
        InputWithMaxLengthErrorComponent,
        InputWithCopyableComponent,
        InlineInputComponent
    ]
})
export class InputModule {}
