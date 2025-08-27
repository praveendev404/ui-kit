import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { DatePickerRangeModel } from '@dagility-ui/kit';

const now = new Date();
const tomorrow = now.setDate(now.getDate() + 1);

@Component({
    selector: 'app-date-range-picker',
    templateUrl: './date-range-picker.component.html',
    styleUrls: ['./date-range-picker.component.scss'],
    standalone: false
})
export class DateRangePickerComponent {
    control = new UntypedFormControl({
        startDate: Date.now(),
        endDate: tomorrow
    });

    range: DatePickerRangeModel = null;

    range2: DatePickerRangeModel = null;

    range3: DatePickerRangeModel = null;

    rangeChanged(event: DatePickerRangeModel) {
        console.log(event);
    }
}
