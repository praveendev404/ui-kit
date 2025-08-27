import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-typeahead-with-error',
    templateUrl: './typeahead-with-error.component.html',
    standalone: false
})
export class TypeaheadWithErrorComponent implements OnInit {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];

    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit(): void {
        this.initForm();
        this.setError();
    }

    initForm() {
        this.form = this.fb.group({
            typeaheadError: ['', Validators.required]
        });
    }

    setError() {
        const control = this.form.get('typeaheadError');
        control.markAsTouched();
        setTimeout(() => control.updateValueAndValidity());
    }
}
