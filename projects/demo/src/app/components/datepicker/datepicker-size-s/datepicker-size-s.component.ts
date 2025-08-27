import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-datepicker-size-s',
    templateUrl: './datepicker-size-s.component.html',
    standalone: false
})
export class DatepickerSizeSComponent {
    formGroup: UntypedFormGroup;

    date = new UntypedFormControl();

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
