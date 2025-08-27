import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { TreelikeDropdownBasicComponent } from './treelike-dropdown-basic/treelike-dropdown-basic.component';

const DEMOS: Record<string, any> = {
    'treelike-dropdown-basic': {
        title: 'Treelike Dropdown (Size M)',
        code: 'treelike-dropdown/treelike-dropdown-basic/treelike-dropdown-basic.component.ts',
        markup: 'treelike-dropdown/treelike-dropdown-basic/treelike-dropdown-basic.component.html',
        type: TreelikeDropdownBasicComponent
    },
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: {demos: DEMOS}
            }
        ])
    ],
    declarations: [
        TreelikeDropdownBasicComponent,
    ]
})
export class TreelikeDropdownModule {
}
