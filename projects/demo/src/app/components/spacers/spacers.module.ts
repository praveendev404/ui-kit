import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'padding',
                loadChildren: () =>
                    import('./padding/padding.module').then(
                        m => m.PaddingModule
                    )
            },
            {
                path: 'margin',
                loadChildren: () =>
                    import('./margin/margin.module').then(m => m.MarginModule)
            }
        ])
    ],
    declarations: []
})
export class SpacersModule {}
