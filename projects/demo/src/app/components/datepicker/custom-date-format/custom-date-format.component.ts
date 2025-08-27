import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Component({
    selector: 'app-custom-date-format',
    templateUrl: './custom-date-format.component.html',
    standalone: false
})
export class CustomDateFormatComponent implements OnInit {
    formGroup: UntypedFormGroup;

    dateFormat: string = 'd-M-yyyy H:mm';

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
