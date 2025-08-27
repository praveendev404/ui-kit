import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ConfirmModal } from '../../../models/confirmModal';

@Component({
    selector: 'lib-modal-confirm',
    templateUrl: './modal-confirm.component.html',
    styleUrls: ['./modal-confirm.component.scss'],
    standalone: false
})
export class ModalConfirmComponent {
    @Output() confirmOk: EventEmitter<any> = new EventEmitter();
    @Output() additionalBtnClicked: EventEmitter<any> = new EventEmitter();
    @Output() cancelBtnClicked: EventEmitter<any> = new EventEmitter();
    @Output() crossClicked: EventEmitter<any> = new EventEmitter();

    message: ConfirmModal;

    @Input() additionalButtonText: string = '';
    @Input() confirmButtonText = 'Yes';
    @Input() closeButtonText = 'No';

    @Input() showAdditionalButton = false;
    @Input() showConfirmButton = true;
    @Input() showCancelButton = true;

    confirmButtonWithLoader = false;
    confirmButtonLoading = false;

    cancelBtnTooltip = '';
    cancelBtnDisable = false;

    constructor(public modal: NgbActiveModal) {}

    confirm() {
        this.confirmOk.emit(true);

        if (!this.confirmButtonWithLoader) {
            this.modal.close();
        }
    }

    confirmAdditional() {
        this.additionalBtnClicked.emit(true);
        this.modal.close();
    }

    cancel() {
        this.cancelBtnClicked.emit();
        this.modal.dismiss('cancel click');
    }
}
