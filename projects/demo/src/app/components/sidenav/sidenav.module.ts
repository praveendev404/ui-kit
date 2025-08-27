import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { SidenavBasicComponent } from './sidenav-basic/sidenav-basic.component';

const DEMOS: Record<string, any> = {
    'base-sidenav': {
        title: 'Sidenav Navigation',
        code: 'sidenav/sidenav-basic/sidenav-basic.component.ts',
        markup: 'sidenav/sidenav-basic/sidenav-basic.component.html',
        type: SidenavBasicComponent
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
    declarations: [SidenavBasicComponent]
})
export class SidenavModule {}
