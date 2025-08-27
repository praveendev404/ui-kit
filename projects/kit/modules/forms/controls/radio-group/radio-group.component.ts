import { Component, Input } from '@angular/core';

import { BaseFormControl } from '../base-form-control';

let id = 1;

@Component({
    selector: 'lib-radio-group',
    templateUrl: './radio-group.component.html',
    standalone: false
})
export class RadioGroupComponent extends BaseFormControl {
    @Input() id: string = 'radiogroup';
    @Input() options: RadioGroupItem[];

    name = `radio-group_` + id++;

    @Input() testId: string = 'radio';
}

export interface RadioGroupItem {
    label: string;
    value: string;
    disabled?: boolean;
}
