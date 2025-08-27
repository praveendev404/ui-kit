import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { TypeaheadBasicComponent } from './typeahead-basic/typeahead-basic.component';
import { TypeaheadDisabledComponent } from './typeahead-disabled/typeahead-disabled.component';
import { TypeaheadSizeSComponent } from './typeahead-size-s/typeahead-size-s.component';
import { TypeaheadSizeLComponent } from './typeahead-size-l/typeahead-size-l.component';
import { TypeaheadWithValueComponent } from './typeahead-with-value/typeahead-with-value.component';
import { TypeaheadWithErrorComponent } from './typeahead-with-error/typeahead-with-error.component';
import { ReadonlyTypeaheadComponent } from './readonly-typeahead/readonly-typeahead.component';
import { TypeaheadNumberComponent } from './typeahead-number/typeahead-number.component';

const DEMOS: Record<string, any> = {
    'typeahead-basic': {
        title: 'Typeahead (Size M)',
        code: 'typeahead/typeahead-basic/typeahead-basic.component.ts',
        markup: 'typeahead/typeahead-basic/typeahead-basic.component.html',
        type: TypeaheadBasicComponent
    },
    'typeahead-size-s': {
        title: 'Typeahead Size S',
        code: 'typeahead/typeahead-size-s/typeahead-size-s.component.ts',
        markup: 'typeahead/typeahead-size-s/typeahead-size-s.component.html',
        type: TypeaheadSizeSComponent
    },
    'typeahead-size-l': {
        title: 'Typeahead Size L',
        code: 'typeahead/typeahead-size-l/typeahead-size-l.component.ts',
        markup: 'typeahead/typeahead-size-l/typeahead-size-l.component.html',
        type: TypeaheadSizeLComponent
    },
    'typeahead-with-value': {
        title: 'Typeahead With Value',
        code: 'typeahead/typeahead-with-value/typeahead-with-value.component.ts',
        markup: 'typeahead/typeahead-with-value/typeahead-with-value.component.html',
        type: TypeaheadWithValueComponent
    },
    'typeahead-with-error': {
        title: 'Typeahead With Error',
        code: 'typeahead/typeahead-with-error/typeahead-with-error.component.ts',
        markup: 'typeahead/typeahead-with-error/typeahead-with-error.component.html',
        type: TypeaheadWithErrorComponent
    },
    'typeahead-disabled': {
        title: 'Typeahead Disabled',
        code: 'typeahead/typeahead-disabled/typeahead-disabled.component.ts',
        markup: 'typeahead/typeahead-disabled/typeahead-disabled.component.html',
        type: TypeaheadDisabledComponent
    },
    'readonly-typeahead': {
        title: 'Readonly Typeahead',
        code: 'typeahead/readonly-typeahead/readonly-typeahead.component.ts',
        markup: 'typeahead/readonly-typeahead/readonly-typeahead.component.html',
        type: ReadonlyTypeaheadComponent
    },
    'number-typeahead': {
        title: 'Number Typeahead',
        code: 'typeahead/typeahead-number/typeahead-number.component.ts',
        markup: 'typeahead/typeahead-number/typeahead-number.component.html',
        type: TypeaheadNumberComponent
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
        TypeaheadBasicComponent,
        TypeaheadDisabledComponent,
        TypeaheadSizeSComponent,
        TypeaheadSizeLComponent,
        TypeaheadWithValueComponent,
        TypeaheadWithErrorComponent,
        ReadonlyTypeaheadComponent,
        TypeaheadNumberComponent
    ]
})
export class TypeaheadModule {}
