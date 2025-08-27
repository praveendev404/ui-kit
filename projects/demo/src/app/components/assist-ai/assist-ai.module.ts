import { NgModule } from '@angular/core';
import { UiKitModule } from '@dagility-ui/kit';
import { AssitAiComponent } from './assist-ai.component';
import { RouterModule } from '@angular/router';
import { ExamplesComponent } from '../../shared/examples/examples.component';

const DEMOS: Record<string, any> = {
    'assist-ai': {
        title: 'Assist AI',
        code: 'assist-ai/assist-ai.component.ts',
        type: AssitAiComponent,
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
    declarations: [AssitAiComponent],
})
export class AssistAiModule {}
