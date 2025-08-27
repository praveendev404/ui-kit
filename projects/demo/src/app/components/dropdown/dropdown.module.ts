import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { DropdownBasicComponent } from './basic/dropdown-basic.component';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { DropdownMultilineComponent } from './multiline/dropdown-multiline.component';
import { DropdownAddItemComponent } from './add-item/dropdown-add-item.component';
import { DropdownCustomComponent } from './custom-templates/dropdown-custom.component';
import { DropdownSizeSComponent } from './dropdown-size-s/dropdown-size-s.component';
import { DropdownSizeLComponent } from './dropdown-size-l/dropdown-size-l.component';
import { DropdownWithErrorComponent } from './dropdown-with-error/dropdown-with-error.component';
import { DropdownDisabledComponent } from './dropdown-disabled/dropdown-disabled.component';
import {GroupedDropdownComponent} from './grouped/grouped-dropdown.component';

const DEMOS: Record<string, any> = {
    'dropdown-basic': {
        title: 'Dropdown (Size M)',
        code: 'dropdown/basic/dropdown-basic.component.ts',
        markup: 'dropdown/basic/dropdown-basic.component.html',
        type: DropdownBasicComponent
    },
    'dropdown-size-s': {
        title: 'Dropdown Size S',
        code: 'dropdown/dropdown-size-s/dropdown-size-s.component.ts',
        markup: 'dropdown/dropdown-size-s/dropdown-size-s.component.html',
        type: DropdownSizeSComponent
    },
    'dropdown-size-l': {
        title: 'Dropdown Size L',
        code: 'dropdown/dropdown-size-l/dropdown-size-l.component.ts',
        markup: 'dropdown/dropdown-size-l/dropdown-size-l.component.html',
        type: DropdownSizeLComponent
    },
    'dropdown-grouped': {
        title: 'Grouped Dropdown',
        code: 'dropdown/grouped/grouped-dropdown.component.ts',
        markup: 'dropdown/grouped/grouped-dropdown.component.html',
        type: GroupedDropdownComponent
    },
    'dropdown-multiline': {
        title: 'Dropdown With Multiple Values',
        code: 'dropdown/multiline/dropdown-multiline.component.ts',
        markup: 'dropdown/multiline/dropdown-multiline.component.html',
        type: DropdownMultilineComponent
    },
    'dropdown-add-item': {
        title: 'Dropdown With Added Options',
        code: 'dropdown/add-item/dropdown-add-item.component.ts',
        markup: 'dropdown/add-item/dropdown-add-item.component.html',
        type: DropdownAddItemComponent
    },
    'dropdown-custom': {
        title: 'Dropdown With Custom Option Templates',
        code: 'dropdown/custom-templates/dropdown-custom.component.ts',
        markup: 'dropdown/custom-templates/dropdown-custom.component.html',
        type: DropdownCustomComponent
    },
    'dropdown-with-error': {
        title: 'Dropdown With Error',
        code: 'dropdown/dropdown-with-error/dropdown-with-error.component.ts',
        markup: 'dropdown/dropdown-with-error/dropdown-with-error.component.html',
        type: DropdownWithErrorComponent
    },
    'disabled-dropdown': {
        title: 'Disabled Dropdown',
        code: 'dropdown/dropdown-disabled/dropdown-disabled.component.ts',
        markup: 'dropdown/dropdown-disabled/dropdown-disabled.component.html',
        type: DropdownDisabledComponent
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
        DropdownBasicComponent,
        DropdownMultilineComponent,
        DropdownAddItemComponent,
        DropdownCustomComponent,
        DropdownSizeSComponent,
        DropdownSizeLComponent,
        DropdownWithErrorComponent,
        DropdownDisabledComponent,
        GroupedDropdownComponent,
    ]
})
export class DropdownModule {}
