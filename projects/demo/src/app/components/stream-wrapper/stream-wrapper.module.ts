import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { StreamWrapperBasicComponent } from './stream-wrapper-basic/stream-wrapper-basic.component';

const DEMOS: Record<string, any> = {
    'stream-wrapper-basic': {
        title: 'Stream Wrapper',
        code: 'stream-wrapper/stream-wrapper-basic/stream-wrapper-basic.component.ts',
        markup: 'stream-wrapper/stream-wrapper-basic/stream-wrapper-basic.component.html',
        type: StreamWrapperBasicComponent
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
    declarations: [StreamWrapperBasicComponent]
})
export class StreamWrapperModule {}
