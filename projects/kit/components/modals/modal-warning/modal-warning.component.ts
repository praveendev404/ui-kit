import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalWithImage } from '../../../models/confirmModalWithImage';

@Component({
    selector: 'lib-modal-warning',
    templateUrl: './modal-warning.component.html',
    styleUrls: ['./modal-warning.component.scss'],
    standalone: false
})
export class ModalWarningComponent {
    @Output() confirmOk: EventEmitter<any> = new EventEmitter();
    @Output() cancelBtnClicked: EventEmitter<any> = new EventEmitter();

    message: ConfirmModalWithImage;

    @Input() confirmButtonText = 'Yes';
    @Input() closeButtonText = 'No';

    @Input() showConfirmButton = true;
    @Input() showCancelButton = true;

    confirmButtonWithLoader = false;
    confirmButtonLoading = false;

    cancelBtnTooltip = '';
    cancelBtnDisable = false;

    constructor(public modal: NgbActiveModal) {}

    checkImageType(value: any): string {
        if (typeof value === 'string') {
            if (new RegExp('^([^/ ]*)?(/[^/ ]*)+/?..+$').test(value)) {
                return 'url';
            } else {
                return 'icon';
            }
        } else return 'icon';
    }

    confirm() {
        this.confirmOk.emit(true);
        if (!this.confirmButtonWithLoader) {
            this.modal.close();
        }
    }

    cancel() {
        this.cancelBtnClicked.emit();
        this.modal.dismiss('cancel click');
    }
}
