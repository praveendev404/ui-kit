import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'trigger',
    templateUrl: './trigger.component.html',
    styleUrls: ['./trigger.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TriggerComponent),
            multi: true
        }
    ],
    host: { class: 'lib-trigger' },
    standalone: false
})
export class TriggerComponent implements ControlValueAccessor {
    @Input() value: boolean;
    @Input() disabled: boolean;
    @Input() followValue: boolean = false;
    @Input() warningMessage: string;

    @Input() type: 'text' | 'icon' = 'text';

    get warning() {
        return this.warningMessage;
    }

    private onChangeCb: any;
    private onTouchedCb: any;

    constructor() {}

    registerOnChange(fn: Function): void {
        this.onChangeCb = fn;
    }

    registerOnTouched(fn: Function): void {
        this.onTouchedCb = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: boolean): void {
        this.value = value;
    }

    onCheck(): void {
        if (!this.disabled && !this.followValue) {
            this.value = !this.value;
            if (this.onChangeCb) {
                this.onChangeCb(this.value);
                this.onTouchedCb();
            }
        }
    }
}
