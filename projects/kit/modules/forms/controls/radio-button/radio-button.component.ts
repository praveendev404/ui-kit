import { Component, EventEmitter, Input, Output } from '@angular/core';

import { BaseFormControl } from '../base-form-control';

let id = 1;

@Component({
    selector: 'lib-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    host: { class: 'lib-radio-button' },
    standalone: false
})
export class RadioButtonComponent extends BaseFormControl<any, HTMLInputElement> {
    @Input() id: string = name + `${id++}`;
    @Input() name: string;
    @Input() checked: boolean = false;
    @Input() preventDefault = false;
    @Input() set disabled(value: boolean) {
        this.setDisabledState(value);
    }
    @Input() noLabelMargin = false;

    @Output() change = new EventEmitter();

    disabledState: boolean;

    @Input() testId: string = 'radio';

    handleChange(): void {
        if (this.disabledState || this.preventDefault) {
            return;
        }

        this.onTouched();
        this.onChange(this.value);

        this.change.emit(this.value);
    }

    writeValue(obj: any) {}

    setDisabledState(isDisabled: boolean): void {
        this.disabledState = isDisabled;
    }
}
