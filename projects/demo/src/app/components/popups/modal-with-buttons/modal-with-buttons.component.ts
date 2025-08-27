import { Component } from '@angular/core';
import { ModalService } from '@dagility-ui/kit';
import { ModalWithButtonsViewComponent } from './modal-with-buttons-view/modal-with-buttons-view.component';

@Component({
    selector: 'app-modal-with-buttons',
    templateUrl: './modal-with-buttons.component.html',
    standalone: false
})
export class ModalWithButtonsComponent {
    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalService
            .open(ModalWithButtonsViewComponent, {
                centered: true
            })
            .result.then(() => {})
            .catch(() => {});
    }
}
