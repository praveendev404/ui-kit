import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { HorizontalScrollbarComponent } from './horizontal-scrollbar/horizontal-scrollbar.component';
import { VerticalScrollbarComponent } from './vertical-scrollbar/vertical-scrollbar.component';
import { BothSideScrollbarComponent } from './both-side-scrollbar/both-side-scrollbar.component';

const DEMOS: Record<string, any> = {
    'horizontal-scrollbar': {
        title: 'Horizontal Scrollbar',
        code: 'scrollbar/horizontal-scrollbar/horizontal-scrollbar.component.ts',
        markup: 'scrollbar/horizontal-scrollbar/horizontal-scrollbar.component.html',
        type: HorizontalScrollbarComponent
    },
    'vertical-scrollbar': {
        title: 'Vertical Scrollbar',
        code: 'scrollbar/vertical-scrollbar/vertical-scrollbar.component.ts',
        markup: 'scrollbar/vertical-scrollbar/vertical-scrollbar.component.html',
        type: VerticalScrollbarComponent
    },
    'both-side-scrollbar': {
        title: 'Both Side Scrollbar',
        code: 'scrollbar/both-side-scrollbar/both-side-scrollbar.component.ts',
        markup: 'scrollbar/both-side-scrollbar/both-side-scrollbar.component.html',
        type: BothSideScrollbarComponent
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
        HorizontalScrollbarComponent,
        VerticalScrollbarComponent,
        BothSideScrollbarComponent
    ]
})
export class ScrollbarModule {}
