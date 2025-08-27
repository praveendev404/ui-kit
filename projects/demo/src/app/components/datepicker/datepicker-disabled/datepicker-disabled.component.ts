import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-datepicker-disabled',
    templateUrl: './datepicker-disabled.component.html',
    standalone: false
})
export class DatepickerDisabledComponent implements OnInit {
    formGroup: UntypedFormGroup;

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
