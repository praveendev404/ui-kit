import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-datepicker-with-error',
    templateUrl: './datepicker-with-error.component.html',
    standalone: false
})
export class DatepickerWithErrorComponent {
    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            dropdownError: [null, Validators.required]
        });

        const control = this.form.get('dropdownError');
        control.markAsTouched();
        setTimeout(() => control.updateValueAndValidity());
    }
}
