import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule, PagerService } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { ExpansionPanelComponent } from './expansion-panel-basic/expansion-panel.component';

const DEMOS: Record<string, any> = {
    'expansion-panel': {
        title: 'Expansion Panel',
        code: 'expansion-panel/expansion-panel-basic/expansion-panel.component.ts',
        markup: 'expansion-panel/expansion-panel-basic/expansion-panel.component.html',
        type: ExpansionPanelComponent
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
    declarations: [ExpansionPanelComponent],
    providers: [PagerService]
})
export class ExpansionPanelModule {}
