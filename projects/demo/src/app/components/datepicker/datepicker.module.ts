import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { DatepickerComponent } from './basic/datepicker.component';
import { CustomDateFormatComponent } from './custom-date-format/custom-date-format.component';
import { WithoutTimeComponent } from './without-time/without-time.component';
import { DateRangePickerComponent } from './date-range-picker/date-range-picker.component';
import { DatepickerSizeSComponent } from './datepicker-size-s/datepicker-size-s.component';
import { DatepickerSizeLComponent } from './datepicker-size-l/datepicker-size-l.component';
import { DatepickerWithErrorComponent } from './datepicker-with-error/datepicker-with-error.component';
import { DatepickerDisabledComponent } from './datepicker-disabled/datepicker-disabled.component';
import { DatepickerAdapterComponent } from './datepicker-adapter/datepicker-adapter.component';
import { DatepickerAdapterSizeSComponent } from './datepicker-adapter-size-s/datepicker-adapter-size-s.component';
import { DatepickerAdapterSizeLComponent } from './datepicker-adapter-size-l/datepicker-adapter-size-l.component';

const DEMOS: Record<string, any> = {
    datepicker: {
        title: 'Default Datepicker (Size M)',
        code: 'datepicker/basic/datepicker.component.ts',
        markup: 'datepicker/basic/datepicker.component.html',
        type: DatepickerComponent
    },
    'datepicker-size-s': {
        title: 'Datepicker Size S',
        code: 'datepicker/datepicker-size-s/datepicker-size-s.component.ts',
        markup: 'datepicker/datepicker-size-s/datepicker-size-s.component.html',
        type: DatepickerSizeSComponent
    },
    'datepicker-size-l': {
        title: 'Datepicker Size L',
        code: 'datepicker/datepicker-size-l/datepicker-size-l.component.ts',
        markup: 'datepicker/datepicker-size-l/datepicker-size-l.component.html',
        type: DatepickerSizeLComponent
    },
    'without-time': {
        title: 'Datepicker Without Timepicker',
        code: 'datepicker/without-time/without-time.component.ts',
        markup: 'datepicker/without-time/without-time.component.html',
        type: WithoutTimeComponent
    },
    'custom-date-format': {
        title: 'Datepicker With Custom Date Format',
        code: 'datepicker/custom-date-format/custom-date-format.component.ts',
        markup: 'datepicker/custom-date-format/custom-date-format.component.html',
        type: CustomDateFormatComponent
    },
    'date-range-picker': {
        title: 'Date Range Picker',
        code: 'datepicker/date-range-picker/date-range-picker.component.ts',
        markup: 'datepicker/date-range-picker/date-range-picker.component.html',
        type: DateRangePickerComponent
    },
    'datepicker-with-error': {
        title: 'Date Picker With Error',
        code: 'datepicker/datepicker-with-error/datepicker-with-error.component.ts',
        markup: 'datepicker/datepicker-with-error/datepicker-with-error.component.html',
        type: DatepickerWithErrorComponent
    },
    'datepicker-disabled': {
        title: 'Disabled Date Picker',
        code: 'datepicker/datepicker-disabled/datepicker-disabled.component.ts',
        markup: 'datepicker/datepicker-disabled/datepicker-disabled.component.html',
        type: DatepickerDisabledComponent
    },
    'datepicker-adapter': {
        title: 'Date Picker Adapter (Size M)',
        code: 'datepicker/datepicker-adapter/datepicker-adapter.component.ts',
        markup: 'datepicker/datepicker-adapter/datepicker-adapter.component.html',
        type: DatepickerAdapterComponent
    },
    'datepicker-adapter-size-s': {
        title: 'Date Picker Adapter Size S',
        code: 'datepicker/datepicker-adapter-size-s/datepicker-adapter-size-s.component.ts',
        markup: 'datepicker/datepicker-adapter-size-s/datepicker-adapter-size-s.component.html',
        type: DatepickerAdapterSizeSComponent
    },
    'datepicker-adapter-size-l': {
        title: 'Date Picker Adapter Size L',
        code: 'datepicker/datepicker-adapter-size-l/datepicker-adapter-size-l.component.ts',
        markup: 'datepicker/datepicker-adapter-size-l/datepicker-adapter-size-l.component.html',
        type: DatepickerAdapterSizeLComponent
    }
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS, component: 'datepicker' }
            }
        ])
    ],
    declarations: [
        DatepickerComponent,
        CustomDateFormatComponent,
        WithoutTimeComponent,
        DateRangePickerComponent,
        DatepickerSizeSComponent,
        DatepickerSizeLComponent,
        DatepickerWithErrorComponent,
        DatepickerDisabledComponent,
        DatepickerAdapterComponent,
        DatepickerAdapterSizeSComponent,
        DatepickerAdapterSizeLComponent
    ]
})
export class DatepickerModule {}
