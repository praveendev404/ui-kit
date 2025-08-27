import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule, CUSTOM_ICONS } from '@dagility-ui/kit';
import { IconsComponent } from '../../../shared/icons/icons.component';
import {SharedModule} from '../../../shared/shared.module';

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: IconsComponent,
                data: {icons: CUSTOM_ICONS}
            }
        ]),
        SharedModule
    ],
    declarations: [IconsComponent]
})
export class CustomIconsModule {}
