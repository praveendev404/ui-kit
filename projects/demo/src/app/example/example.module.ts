import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ExampleComponent } from './example.component';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { ExampleSourceComponent } from './example-source/example-source.component';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExampleComponent
            }
        ])
    ],
    declarations: [ExampleComponent, ExampleModalComponent, ExampleSourceComponent]
})
export class ExampleModule {}
