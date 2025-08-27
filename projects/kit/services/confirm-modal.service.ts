import { inject, Injectable } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalWithImage } from '../models/confirmModalWithImage';
import { ModalWarningComponent } from '../components/modals/modal-warning/modal-warning.component';
import { ModalService } from './modal.service';

@Injectable()
export class ConfirmModalService {
    private modal = inject(ModalService);

    open(
        {
            title,
            content,
            closeButtonText = 'Cancel',
            confirmButtonText = 'Proceed',
            showCancelButton = true,
        }: Pick<ConfirmModalWithImage, 'content' | 'title'> &
            Partial<Pick<ModalWarningComponent, 'confirmButtonText' | 'closeButtonText' | 'showCancelButton'>>,
        options: Partial<Omit<NgbModalOptions, 'centered'>> = {}
    ) {
        return this.modal.open(
            ModalWarningComponent,
            {
                ...options,
                centered: true,
            },
            {
                message: {
                    content,
                    title,
                    icon: 'warning',
                    iconFontSize: '20px',
                    iconColor: 'var(--da-warning-base)',
                },
                closeButtonText,
                confirmButtonText,
                showCancelButton,
            }
        );
    }
}
