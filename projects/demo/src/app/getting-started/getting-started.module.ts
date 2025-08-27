import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { GettingStartedPageComponent } from './getting-started.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: GettingStartedPageComponent
            }
        ])
    ],
    declarations: [GettingStartedPageComponent]
})
export class GettingStartedModule {}
