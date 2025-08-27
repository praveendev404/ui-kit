import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@dagility-ui/kit/icons';

import {
    DatepickerComponent,
    DatepickerLeftRangeContentDirective,
    DatepickerRightRangeContentDirective
} from './datepicker/datepicker.component';
import { DatepickerAdapterComponent } from './datepicker-adapter/datepicker-adapter.component';
import { DatepickerMultiMonthViewComponent } from './datepicker-adapter/datepicker-multi-month-view/datepicker-multi-month-view.component';
import { DatepickerRangeNavigationComponent } from './datepicker/datepicker-range-dialog/datepicker-range-navigation/datepicker-range-navigation.component';
import { DatepickerRangeDialogComponent } from './datepicker/datepicker-range-dialog/datepicker-range-dialog.component';

const SHARED_COMPONENTS = [DatepickerComponent, DatepickerAdapterComponent];

const SHARED_DIRECTIVES = [
    DatepickerLeftRangeContentDirective,
    DatepickerRightRangeContentDirective
];

@NgModule({
    imports: [CommonModule, NgbModule, FormsModule, IconsModule, ReactiveFormsModule],
    declarations: [
        DatepickerMultiMonthViewComponent,
        DatepickerRangeNavigationComponent,
        DatepickerRangeDialogComponent,
        ...SHARED_COMPONENTS,
        ...SHARED_DIRECTIVES,
    ],
    exports: [...SHARED_COMPONENTS, ...SHARED_DIRECTIVES]
})
export class DatepickerModule {}
