import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-datepicker-size-l',
    templateUrl: './datepicker-size-l.component.html',
    standalone: false
})
export class DatepickerSizeLComponent {
    formGroup: UntypedFormGroup;

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
