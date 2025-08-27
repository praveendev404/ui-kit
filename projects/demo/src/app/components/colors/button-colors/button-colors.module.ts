import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    ColorGroup,
    ColorsComponent
} from '../../../shared/colors/colors.component';

const COLORS: ColorGroup[] = [
    {
        title: 'Normal',
        colors: [
            { name: 'Blue_1 (main)', value: '#317ce2', textColor: 'white' },
            { name: '4_normal', value: '#4CAF50', textColor: 'white' },
            { name: '0_normal', value: '#D32F2F', textColor: 'white' },
            { name: '', value: 'white', textColor: 'white' },
            { name: 'Gray_4', value: '#F5F5F5', textColor: 'black' }
        ]
    },
    {
        title: 'Hover',
        colors: [
            { name: 'Blue_0 (hover)', value: '#005AD5', textColor: 'white' },
            { name: '4_hover', value: '#43A047', textColor: 'white' },
            { name: '0_hover', value: '#C62828', textColor: 'white' },
            { name: 'Gray_4', value: '#F5F5F5', textColor: 'black' },
            { name: 'Gray_6', value: '#E5E5E5', textColor: 'black' }
        ]
    },
    {
        title: 'Disable',
        colors: [
            { name: 'Blue_3', value: '#7BABEC', textColor: 'black' },
            { name: '4_border', value: '#A5D6A7', textColor: 'black' },
            { name: '0_border', value: '#EF9A9A', textColor: 'black' },
            { name: '', value: 'white', textColor: 'white' },
            { name: 'Gray_5', value: '#F8F9FA', textColor: 'black' }
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
export class ButtonColorsModule {}
