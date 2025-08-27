import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { NormalButtonsComponent } from './normal-buttons/normal-buttons.component';
import { DisabledButtonsComponent } from './disabled-buttons/disabled-buttons.component';
import { ButtonsWithIconsComponent } from './buttons-with-icons/buttons-with-icons.component';
import { SwitchComponent } from './switch/switch.component';
import { ZoomButtonsComponent } from './zoom-buttons/zoom-buttons.component';
import { ButtonWithLoaderComponent } from './button-with-loader/button-with-loader.component';
import { ButtonsSizeSComponent } from './buttons-size-s/buttons-size-s.component';
import { ButtonsSizeLComponent } from './buttons-size-l/buttons-size-l.component';
import { ButtonCopyComponent } from './button-copy/button-copy.component';

const DEMOS: Record<string, any> = {
    'normal-buttons': {
        title: 'Normal Buttons (Size M)',
        code: 'buttons/normal-buttons/normal-buttons.component.ts',
        markup: 'buttons/normal-buttons/normal-buttons.component.html',
        type: NormalButtonsComponent
    },
    'buttons-size-s': {
        title: 'Buttons Size S',
        code: 'buttons/buttons-size-s/buttons-size-s.component.ts',
        markup: 'buttons/buttons-size-s/buttons-size-s.component.html',
        type: ButtonsSizeSComponent
    },
    'buttons-size-l': {
        title: 'Buttons Size L',
        code: 'buttons/buttons-size-l/buttons-size-l.component.ts',
        markup: 'buttons/buttons-size-l/buttons-size-l.component.html',
        type: ButtonsSizeLComponent
    },
    'disabled-buttons': {
        title: 'Disabled Buttons',
        code: 'buttons/disabled-buttons/disabled-buttons.component.ts',
        markup: 'buttons/disabled-buttons/disabled-buttons.component.html',
        type: DisabledButtonsComponent
    },
    'buttons-with-icons': {
        title: 'Buttons With Icons',
        code: 'buttons/buttons-with-icons/buttons-with-icons.component.ts',
        markup: 'buttons/buttons-with-icons/buttons-with-icons.component.html',
        type: ButtonsWithIconsComponent
    },
    'button-with-loader': {
        title: 'Button With Loader',
        code: 'buttons/button-with-loader/button-with-loader.component.ts',
        markup: 'buttons/button-with-loader/button-with-loader.component.html',
        type: ButtonWithLoaderComponent
    },
    switch: {
        title: 'Switch',
        code: 'buttons/switch/switch.component.ts',
        markup: 'buttons/switch/switch.component.html',
        type: SwitchComponent
    },
    'zoom-buttons': {
        title: 'Zoom Buttons',
        code: 'buttons/zoom-buttons/zoom-buttons.component.ts',
        markup: 'buttons/zoom-buttons/zoom-buttons.component.html',
        type: ZoomButtonsComponent
    },
    'button-copy': {
        title: 'Button with clipboard',
        code: 'buttons/button-copy/button-copy.component.ts',
        markup: 'buttons/button-copy/button-copy.component.html',
        type: ButtonCopyComponent
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
        NormalButtonsComponent,
        DisabledButtonsComponent,
        ButtonsWithIconsComponent,
        SwitchComponent,
        ZoomButtonsComponent,
        ButtonWithLoaderComponent,
        ButtonsSizeSComponent,
        ButtonsSizeLComponent,
        ButtonCopyComponent
    ]
})
export class ButtonsModule {}
