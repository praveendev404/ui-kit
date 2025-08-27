import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'custom-icons',
                loadChildren: () =>
                    import('./custom-icons/custom-icons.module').then(
                        m => m.CustomIconsModule
                    )
            }
        ])
    ],
    declarations: []
})
export class IconsModule {}
