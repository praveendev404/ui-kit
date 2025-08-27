import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';
import { HeaderComponent } from './header/header.component';
import { ExamplesComponent } from './examples/examples.component';
import { WidgetDemoComponent } from './widget-demo/widget-demo';
import { CodeComponent } from './code/code.component';
import { ColorsComponent } from './colors/colors.component';
import { SpacersComponent } from './spacers/spacers.component';

const DECLARABLES = [
    HeaderComponent,
    WidgetDemoComponent,
    ExamplesComponent,
    CodeComponent,
    ColorsComponent,
    SpacersComponent
];

@NgModule({
    imports: [CommonModule, RouterModule, UiKitModule],
    exports: [CommonModule, UiKitModule, ...DECLARABLES],
    declarations: [...DECLARABLES]
})
export class SharedModule {}
