import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    ColorGroup,
    ColorsComponent
} from '../../../shared/colors/colors.component';

const COLORS: ColorGroup[] = [
    {
        title: 'Border',
        colors: [
            { name: 'Border_1', value: '#ECECEC', textColor: 'black' },
            { name: 'Border_2', value: '#DFE1E5', textColor: 'black' },
            { name: 'Border_3', value: '#D7D7D7', textColor: 'black' },
        ]
    },
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
export class BorderColorsModule {}
