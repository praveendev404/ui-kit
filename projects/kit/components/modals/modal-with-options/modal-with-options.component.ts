import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModal } from '../../../models/confirmModal';

export interface RadioButton {
    buttonText: string;
}

@Component({
    selector: 'lib-modal-with-options',
    templateUrl: './modal-with-options.component.html',
    styleUrls: ['./modal-with-options.component.scss'],
    standalone: false
})
export class ModalWithOptionsComponent {
    @Output() confirmOk: EventEmitter<any> = new EventEmitter();
    @Output() cancelBtnClicked: EventEmitter<any> = new EventEmitter();

    radios: RadioButton[];

    selectedRadioButton: number = 0;

    message: ConfirmModal;
    @Input() confirmButtonText = 'Confirm';
    @Input() closeButtonText = 'Close';

    showConfirmButton = true;
    showCancelButton = true;

    confirmButtonWithLoader = false;
    confirmButtonLoading = false;

    constructor(public modal: NgbActiveModal) {}

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

    switchRadioButton(index: number) {
        this.selectedRadioButton = index;
    }
}
