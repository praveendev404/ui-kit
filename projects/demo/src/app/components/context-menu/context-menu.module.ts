import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { ContextMenuSpecialItemsComponent } from './context-menu-special-items/context-menu-special-items.component';

const DEMOS: Record<string, any> = {
    'context-menu': {
        title: 'Context Menu',
        code: 'context-menu/context-menu/context-menu.component.ts',
        markup: 'context-menu/context-menu/context-menu.component.html',
        type: ContextMenuComponent
    },
    'context-menu-with-special-items': {
        title: 'Context Menu With Special Items',
        code: 'context-menu/context-menu-special-items/context-menu-special-items.component.ts',
        markup: 'context-menu/context-menu-special-items/context-menu-special-items.component.html',
        type: ContextMenuSpecialItemsComponent
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
    declarations: [ContextMenuComponent, ContextMenuSpecialItemsComponent]
})
export class ContextMenuModule {}
