import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-inline-input',
    templateUrl: './inline-input.component.html',
    standalone: false
})
export class InlineInputComponent {
    value: string = `Hi i'm inline input component`;

    formControl = new FormControl(this.value, [Validators.maxLength(10)]);

    formControl1 = new FormControl('2333', [Validators.minLength(10)]);
}
