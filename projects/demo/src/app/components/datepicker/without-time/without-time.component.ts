import {Component, OnInit} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup} from '@angular/forms';

@Component({
    selector: 'app-without-time',
    templateUrl: './without-time.component.html',
    standalone: false
})
export class WithoutTimeComponent implements OnInit {
    formGroup: UntypedFormGroup;

    ngOnInit(): void {
        const dateNow = Date.now();

        this.formGroup = new UntypedFormGroup({
            date: new UntypedFormControl(dateNow)
        });
    }
}
