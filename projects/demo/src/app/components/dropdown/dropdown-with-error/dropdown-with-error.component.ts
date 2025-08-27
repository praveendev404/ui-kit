import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-dropdown-with-error',
    templateUrl: './dropdown-with-error.component.html',
    standalone: false
})
export class DropdownWithErrorComponent implements OnInit {
    items: { label: string; value: any }[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Grape', value: 'Grape' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pineapple', value: 'pineapple' }
    ];

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
