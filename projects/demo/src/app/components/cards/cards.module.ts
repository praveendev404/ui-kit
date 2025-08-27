import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { CardBasicComponent } from './card-basic/card-basic.component';
import { CardWithHeaderComponent } from './card-with-header/card-with-header.component';
import { CardWithFooterComponent } from './card-with-footer/card-with-footer.component';

const DEMOS: Record<string, any> = {
    'card-basic': {
        title: 'Card',
        code: 'cards/card-basic/card-basic.component.ts',
        markup: 'cards/card-basic/card-basic.component.html',
        type: CardBasicComponent
    },
    'card-with-action': {
        title: 'Card With Header',
        code: 'cards/card-with-header/card-with-header.component.ts',
        markup: 'cards/card-with-header/card-with-header.component.html',
        type: CardWithHeaderComponent
    },
    'card-with-footer': {
        title: 'Card With Footer',
        code: 'cards/card-with-footer/card-with-footer.component.ts',
        markup: 'cards/card-with-footer/card-with-footer.component.html',
        type: CardWithFooterComponent
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
        CardBasicComponent,
        CardWithHeaderComponent,
        CardWithFooterComponent
    ]
})
export class CardsModule {}
