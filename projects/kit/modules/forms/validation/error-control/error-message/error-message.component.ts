import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { coerceBooleanProperty } from '../../../../../utils/utilities';

@Component({
    selector: 'lib-error-message',
    templateUrl: './error-message.component.html',
    styleUrls: ['./error-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: { class: 'error-message' },
    standalone: false
})
export class ErrorMessageComponent {
    icons = {
        faExclamationCircle
    };
    @Input() set message(value: string) {
        this.text = value;
        this.show = coerceBooleanProperty(value);
        if (!(this.cdr as any)['destroyed']) {
            this.cdr.detectChanges();
        }
    }

    text: string;
    show = false;

    constructor(private cdr: ChangeDetectorRef) {}
}
