import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { SpinnerBasicComponent } from './basic/spinner-basic.component';
import { LoaderComponent } from './loader/loader.component';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { WaitingLoaderComponent } from './waiting-loader/waiting-loader.component';
import { WaitingModalComponent } from './waiting-modal/waiting-modal.component';

const DEMOS: Record<string, any> = {
    'spinner-basic': {
        title: 'Spinner',
        code: 'spinner/basic/spinner-basic.component.ts',
        markup: 'spinner/basic/spinner-basic.component.html',
        type: SpinnerBasicComponent
    },
    loader: {
        title: 'Loader',
        code: 'spinner/loader/loader.component.ts',
        markup: 'spinner/loader/loader.component.html',
        type: LoaderComponent
    },
    'progress-spinner': {
        title: 'Progress Spinner',
        code: 'spinner/progress-spinner/progress-spinner.component.ts',
        markup: 'spinner/progress-spinner/progress-spinner.component.html',
        type: ProgressSpinnerComponent
    },
    'waiting-loader': {
        title: 'Waiting loader',
        code: 'spinner/waiting-loader/waiting-loader.component.ts',
        markup: 'spinner/waiting-loader/waiting-loader.component.html',
        type: WaitingLoaderComponent
    },
    'waiting-modal': {
        title: 'Waiting modal',
        code: 'spinner/waiting-modal/waiting-modal.component.ts',
        markup: 'spinner/waiting-modal/waiting-modal.component.html',
        type: WaitingModalComponent
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
        SpinnerBasicComponent,
        LoaderComponent,
        ProgressSpinnerComponent,
        WaitingLoaderComponent,
        WaitingModalComponent
    ]
})
export class SpinnerModule {}
