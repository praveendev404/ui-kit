import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    ColorGroup,
    ColorsComponent
} from '../../../shared/colors/colors.component';

const COLORS: ColorGroup[] = [
    {
        title: 'Typography Colors',
        colors: [
            { name: 'Blue_1 (main)', value: '#317CE2', textColor: 'white' },
            { name: 'Font_1', value: '#000000', textColor: 'white' },
            { name: 'Font_2', value: '#313131', textColor: 'white' },
            { name: 'Font_3', value: '#565656', textColor: 'white' },
            { name: 'Font_4', value: '#949494', textColor: 'white' }
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
export class TypographyColorsModule {}
