import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

import { coerceBooleanProperty } from '../../../../../utils/utilities';

@Component({
    selector: 'lib-app-warning-message',
    templateUrl: './warning-message.component.html',
    styleUrls: ['./warning-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WarningMessageComponent {
    @Input() set message(value: string) {
        this.text = value;
        this.show = coerceBooleanProperty(value);
        if (!(this.cdr as any)['destroyed']) {
            this.cdr.detectChanges();
        }
    }

    @Input() isInfo: boolean = false;

    text: string;
    show = false;

    constructor(private cdr: ChangeDetectorRef) {}
}
