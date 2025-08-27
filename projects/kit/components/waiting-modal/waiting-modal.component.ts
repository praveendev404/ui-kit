import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
    selector: 'lib-waiting-modal',
    templateUrl: './waiting-modal.component.html',
    styleUrl: './waiting-modal.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'd-flex align-items-center justify-content-center flex-column',
    },
    standalone: false
})
export class WaitingModalComponent {
    @Input() header = 'Please wait a moment';
    @Input() text: string = '... Loading';
}

export function useWaitingModal() {
    const modalService = inject(ModalService);

    return {
        open: (text?: string) =>
            modalService.open(
                WaitingModalComponent,
                {
                    size: 'sm',
                    centered: true,
                    backdrop: 'static',
                    modalDialogClass: 'width-fit-content',
                    beforeDismiss: () => false,
                },
                {
                    text,
                }
            ),
    };
}
