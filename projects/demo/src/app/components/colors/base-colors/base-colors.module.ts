import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    ColorGroup,
    ColorsComponent
} from '../../../shared/colors/colors.component';

const COLORS: ColorGroup[] = [
    {
        title: 'Blue',
        colors: [
            { name: 'Blue_1 (main)', value: '#317CE2', textColor: 'white' },
            { name: 'Blue_2', value: '#5693E7', textColor: 'white' },
            { name: 'Blue_3', value: '#7BABEC', textColor: 'white' },
            { name: 'Blue_4', value: '#C6DBF7', textColor: 'black' },
            { name: 'Blue_5 (hover)', value: '#F1F9FE', textColor: 'black' }
        ]
    },
    {
        title: 'Gray',
        colors: [
            { name: 'Gray_1', value: '#3C4043', textColor: 'white' },
            { name: 'Gray_2', value: '#5F6368', textColor: 'white' },
            { name: 'Gray_3', value: '#BDC1C6', textColor: 'white' },
            { name: 'Gray_4', value: '#F5F5F5', textColor: 'black' },
            { name: 'Gray_5', value: '#F8F9FA', textColor: 'black' },
            { name: 'Gray_6', value: '#E5E5E5', textColor: 'black' }
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
export class BaseColorsModule {}
