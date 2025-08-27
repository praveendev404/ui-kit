import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-input-with-error',
    templateUrl: './input-with-error.component.html',
    standalone: false
})
export class InputWithErrorComponent implements OnInit {
    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.initForm();
        this.setError();
    }

    initForm() {
        this.form = this.fb.group({
            inputError: ['', Validators.required]
        });
    }

    setError() {
        const control = this.form.get('inputError');
        control.markAsTouched();
        setTimeout(() => control.updateValueAndValidity());
    }
}
