import { Component } from '@angular/core';
import { ModalService, ModalWarningComponent } from '@dagility-ui/kit';

@Component({
    selector: 'app-modal-warning',
    templateUrl: './modal-warning.component.html',
    styleUrls: ['./modal-warning.component.scss'],
    standalone: false
})
export class ModalWarningDemoComponent {
    constructor(private modalService: ModalService) {}
    openModal() {
        const modalRef = this.modalService.open(
            ModalWarningComponent,
            { windowClass: 'restrict-delete-dialog' },
            {
                message: {
                    image: 'assets/images/dagilityLogoLight.svg',
                    title: 'You cannot delete the last tab or last group on a Dashboard',
                    content:
                        'Dashboards require one tab with one group in order to add widgets; however, you can rename or hide the group or tab.',
                    icon: 'facInfoCircle',
                    description: 'This is a description',
                    iconFontSize: '20px',
                    iconColor: 'var(--da-warning-base)',
                },
                confirmButtonText: 'Ok',
                showCancelButton: false,
            }
        );
    }
}
