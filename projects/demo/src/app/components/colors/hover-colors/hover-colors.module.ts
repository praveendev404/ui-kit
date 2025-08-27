import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    ColorGroup,
    ColorsComponent
} from '../../../shared/colors/colors.component';

const COLORS: ColorGroup[] = [
    {
        title: 'Hover',
        colors: [
            { name: 'Gray_7 (hover)', value: '#F4F5F7', textColor: 'black' },
            { name: 'Blue_5 (hover)', value: '#F1F9FE', textColor: 'black' }
        ]
    }
];

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ColorsComponent,
                data: { colors: COLORS }
            }
        ])
    ]
})
export class HoverColorsModule {}
