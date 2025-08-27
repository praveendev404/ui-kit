import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-textarea-with-error',
    templateUrl: './textarea-with-error.component.html',
    standalone: false
})
export class TextareaWithErrorComponent implements OnInit {
    form: UntypedFormGroup;

    constructor(private fb: UntypedFormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            textareaWithError: [null, Validators.required]
        });

        const control = this.form.get('textareaWithError');
        control.markAsTouched();
        setTimeout(() => control.updateValueAndValidity());
    }
}
