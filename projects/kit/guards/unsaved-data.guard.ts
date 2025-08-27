import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ModalService } from '../services/modal.service';
import { ModalWarningComponent } from '../components/modals/modal-warning/modal-warning.component';

export interface Warning {
    title: string;
    message: string;
    warningMessage?: string;
    confirmButtonText?: string;
    closeButtonText?: string;
}

export interface ComponentCanDeactivate {
    canDeactivate: () => boolean | Observable<boolean>;
    getWarning: () => Warning;
    beforeLeave?: () => void;
}

@Injectable()
export class UnsavedDataGuard {
    constructor(private modalService: ModalService) {}

    canDeactivate(
        component: ComponentCanDeactivate
    ): Observable<boolean> | boolean {
        const subject: Subject<boolean> = new Subject();
        if (!component || (component && component.canDeactivate())) {
            return true;
        } else {
            const warning = component.getWarning();
            const modalRef = this.modalService.open(
                ModalWarningComponent,
                {
                    centered: true,
                    backdrop: 'static'
                },
                {
                    message: {
                        title: warning.title,
                        content: warning.message,
                        WarningMessage: warning.warningMessage,
                        icon: 'warning',
                        iconFontSize: '20px',
                        iconColor: 'var(--da-warning-base)'
                    },
                    confirmButtonText: warning.confirmButtonText ?? 'Yes',
                    closeButtonText: warning.closeButtonText ?? 'No'
                }
            );

            modalRef.result.then(
                () => {
                    if (component.beforeLeave) {
                        component.beforeLeave();
                    }
                    subject.next(true);
                },
                () => {
                    subject.next(false);
                }
            );

            return subject.asObservable();
        }
    }
}
