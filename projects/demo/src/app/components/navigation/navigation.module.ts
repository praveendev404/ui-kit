import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { HorizontalNavigationComponent } from './horizontal-navigation/horizontal-navigation.component';
import { VerticalNavigationComponent } from './vertical-navigation/vertical-navigation.component';
import { MultiLevelNavigationComponent } from './multi-level-navigation/multi-level-navigation.component';

const DEMOS: Record<string, any> = {
    'horizontal-navigation': {
        title: 'Horizontal Navigation',
        code: 'navigation/horizontal-navigation/horizontal-navigation.component.ts',
        markup: 'navigation/horizontal-navigation/horizontal-navigation.component.html',
        type: HorizontalNavigationComponent
    },
    'multi-level-navigation': {
        title: 'Multi-level Navigation',
        code: 'navigation/multi-level-navigation/multi-level-navigation.component.ts',
        markup: 'navigation/multi-level-navigation/multi-level-navigation.component.html',
        type: MultiLevelNavigationComponent
    },
    'vertical-navigation': {
        title: 'Vertical Navigation',
        code: 'navigation/vertical-navigation/vertical-navigation.component.ts',
        markup: 'navigation/vertical-navigation/vertical-navigation.component.html',
        type: VerticalNavigationComponent
    },
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
        HorizontalNavigationComponent,
        VerticalNavigationComponent,
        MultiLevelNavigationComponent
    ]
})
export class NavigationModule {}
