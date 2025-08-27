import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { TreelikeMenuBasicComponent } from './treelike-menu-basic/treelike-menu-basic.component';

const DEMOS: Record<string, any> = {
    'treelike-menu-basic': {
        title: 'Treelike Menu (Size M)',
        code: 'treelike-menu/treelike-menu-basic/treelike-menu-basic.component.ts',
        markup: 'treelike-menu/treelike-menu-basic/treelike-menu-basic.component.html',
        type: TreelikeMenuBasicComponent
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
    declarations: [TreelikeMenuBasicComponent]
})
export class TreelikeMenuModule {}
