import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: 'base-colors',
                loadChildren: () =>
                    import('./base-colors/base-colors.module').then(
                        m => m.BaseColorsModule
                    )
            },
            {
                path: 'borders-colors',
                loadChildren: () =>
                    import('./border-colors/border-colors.module').then(
                        m => m.BorderColorsModule
                    )
            },
            {
                path: 'hover-colors',
                loadChildren: () =>
                    import('./hover-colors/hover-colors.module').then(
                        m => m.HoverColorsModule
                    )
            },
            {
                path: 'typography-colors',
                loadChildren: () =>
                    import('./typography-colors/typography-colors.module').then(
                        m => m.TypographyColorsModule
                    )
            },
            {
                path: 'button-colors',
                loadChildren: () =>
                    import('./button-colors/button-colors.module').then(
                        m => m.ButtonColorsModule
                    )
            },
            {
                path: 'other-colors',
                loadChildren: () =>
                    import('./other-colors/other-colors.module').then(
                        m => m.OtherColorsModule
                    )
            }
        ])
    ],
    declarations: []
})
export class ColorsModule {}
