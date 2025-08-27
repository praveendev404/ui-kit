import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-with-max-length-error',
    templateUrl: './input-with-max-length-error.component.html',
    standalone: false
})
export class InputWithMaxLengthErrorComponent {
    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.initForm();
        this.setError();
    }

    initForm() {
        this.form = this.fb.group({
            inputError: ['', Validators.required],
        });
    }

    setError() {
        const control = this.form.get('inputError');
        control.markAsTouched();
        setTimeout(() => control.updateValueAndValidity());
    }
}
