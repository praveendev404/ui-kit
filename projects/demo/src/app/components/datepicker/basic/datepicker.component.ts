import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-datepicker',
    templateUrl: './datepicker.component.html',
    standalone: false
})
export class DatepickerComponent implements OnInit {
    formGroup: UntypedFormGroup;

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
