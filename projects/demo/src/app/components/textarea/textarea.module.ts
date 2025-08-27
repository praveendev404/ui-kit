import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { TextareaBasicComponent } from './textarea-basic/textarea-basic.component';
import { TextareaWithValueComponent } from './textarea-with-value/textarea-with-value.component';
import { ReadonlyTextareaComponent } from './readonly-textarea/readonly-textarea.component';
import { TextareaWithMaxLengthComponent } from './textarea-with-max-length/textarea-with-max-length.component';
import { TextareaSizeSComponent } from './textarea-size-s/textarea-size-s.component';
import { TextareaSizeLComponent } from './textarea-size-l/textarea-size-l.component';
import { TextareaWithErrorComponent } from './textarea-with-error/textarea-with-error.component';
import { TextareaDisabledComponent } from './textarea-disabled/textarea-disabled.component';

const DEMOS: Record<string, any> = {
    'textarea-basic': {
        title: 'Textarea (Size M)',
        code: 'textarea/textarea-basic/textarea-basic.component.ts',
        markup: 'textarea/textarea-basic/textarea-basic.component.html',
        type: TextareaBasicComponent
    },
    'textarea-size-s': {
        title: 'Textarea Size S',
        code: 'textarea/textarea-size-s/textarea-size-s.component.ts',
        markup: 'textarea/textarea-size-s/textarea-size-s.component.html',
        type: TextareaSizeSComponent
    },
    'textarea-size-l': {
        title: 'Textarea Size L',
        code: 'textarea/textarea-size-l/textarea-size-l.component.ts',
        markup: 'textarea/textarea-size-l/textarea-size-l.component.html',
        type: TextareaSizeLComponent
    },
    'textarea-with-value.': {
        title: 'Textarea With Value',
        code: 'textarea/textarea-with-value/textarea-with-value.component.ts',
        markup: 'textarea/textarea-with-value/textarea-with-value.component.html',
        type: TextareaWithValueComponent
    },
    'textarea-with-max-length': {
        title: 'Textarea With Max Length',
        code: 'textarea/textarea-with-max-length/textarea-with-max-length.component.ts',
        markup: 'textarea/textarea-with-max-length/textarea-with-max-length.component.html',
        type: TextareaWithMaxLengthComponent
    },
    'textarea-with-error': {
        title: 'Textarea With Error',
        code: 'textarea/textarea-with-error/textarea-with-error.component.ts',
        markup: 'textarea/textarea-with-error/textarea-with-error.component.html',
        type: TextareaWithErrorComponent
    },
    'textarea-disabled': {
        title: 'Disabled Textarea',
        code: 'textarea/textarea-disabled/textarea-disabled.component.ts',
        markup: 'textarea/textarea-disabled/textarea-disabled.component.html',
        type: TextareaDisabledComponent
    },
    'readonly-textarea': {
        title: 'Readonly Textarea',
        code: 'textarea/readonly-textarea/readonly-textarea.component.ts',
        markup: 'textarea/readonly-textarea/readonly-textarea.component.html',
        type: ReadonlyTextareaComponent
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
        TextareaBasicComponent,
        TextareaWithValueComponent,
        ReadonlyTextareaComponent,
        TextareaWithMaxLengthComponent,
        TextareaSizeSComponent,
        TextareaSizeLComponent,
        TextareaWithErrorComponent,
        TextareaDisabledComponent
    ]
})
export class TextareaModule {}
