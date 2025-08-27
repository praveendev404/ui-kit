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
            { name: '0_hover', value: '#C62828', textColor: 'white' },
            { name: '1_hover', value: '#D81B60', textColor: 'white' },
            { name: '', value: '#FFFFFF', textColor: 'white' },
            { name: '', value: '#FFFFFF', textColor: 'white' },
            { name: '4_hover', value: '#43A047', textColor: 'white' },
            { name: '', value: '#FFFFFF', textColor: 'white' },
            { name: 'Blue_0 (hover)', value: '#005AD5', textColor: 'white' },
        ]
    },
    {
        title: 'Active',
        colors: [
            { name: '0_active', value: '#AB2626', textColor: 'white' },
            { name: '1_active', value: '#BD1850', textColor: 'white' },
            { name: '2_active', value: '#CE7B00', textColor: 'white' },
            { name: '3_active', value: '#CEBE30', textColor: 'black' },
            { name: '4_active', value: '#3D8D41', textColor: 'white' },
            { name: '5_active', value: '#0389C6', textColor: 'white' },
            { name: 'Blue_0 (active)', value: '#2865B7', textColor: 'white' },
            { name: '6_active', value: '#344490', textColor: 'white' },
            { name: '7_active', value: '#542F94', textColor: 'white' },
            { name: 'Icons', value: '#747474', textColor: 'white' },
        ]
    },
    {
        title: 'Normal',
        colors: [
            { name: '0_normal', value: '#D32F2F', textColor: 'white' },
            { name: '1_normal', value: '#E91E63', textColor: 'white' },
            { name: '2_normal', value: '#FF9800', textColor: 'white' },
            { name: '3_normal', value: '#FFEB3B', textColor: 'black' },
            { name: '4_normal', value: '#4CAF50', textColor: 'white' },
            { name: '5_normal', value: '#03A9F4', textColor: 'white' },
            { name: 'Blue_1 (main)', value: '#317CE2', textColor: 'white' },
            { name: '6_normal', value: '#4054B2', textColor: 'white' },
            { name: '7_normal', value: '#673AB7', textColor: 'white' },
            { name: 'Font_4', value: '#949494', textColor: 'white' },
        ]
    },
    {
        title: 'Border',
        colors: [
            { name: '0_normal', value: '#D32F2F', textColor: 'white' },
            { name: '1_normal', value: '#E91E63', textColor: 'white' },
            { name: '2_normal', value: '#FF9800', textColor: 'white' },
            { name: '3_normal', value: '#FFEB3B', textColor: 'black' },
            { name: '4_normal', value: '#4CAF50', textColor: 'white' },
            { name: '5_normal', value: '#03A9F4', textColor: 'white' },
            { name: 'Blue_1 (main)', value: '#317CE2', textColor: 'white' },
            { name: '6_normal', value: '#4054B2', textColor: 'white' },
            { name: '7_normal', value: '#673AB7', textColor: 'white' },
            { name: 'Font_4', value: '#949494', textColor: 'white' },
        ]
    },
    {
        title: 'Fill',
        colors: [
            { name: '0_fill', value: '#FECDD2', textColor: 'black' },
            { name: '1_fill', value: '#F8BBD0', textColor: 'black' },
            { name: '2_fill', value: '#FFE0B2', textColor: 'black' },
            { name: '3_fill', value: '#FFF9C4', textColor: 'black' },
            { name: '4_fill', value: '#C8E6C9', textColor: 'black' },
            { name: '5_fill', value: '#B3E5FC', textColor: 'black' },
            { name: 'Blue_4', value: '#C6DBF7', textColor: 'black' },
            { name: '6_fill', value: '#C5CAE9', textColor: 'black' },
            { name: '7_fill', value: '#D1C4E9', textColor: 'black' },
            { name: 'Border_1', value: '#ECECEC', textColor: 'black' },
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
export class OtherColorsModule {}
