import { Component } from '@angular/core';
import { ModalService } from '@dagility-ui/kit';
import { ModalWithInputsViewComponent } from './modal-with-inputs-view/modal-with-inputs-view.component';

@Component({
    selector: 'app-modal-with-inputs',
    templateUrl: './modal-with-inputs.component.html',
    standalone: false
})
export class ModalWithInputsComponent {
    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalService
            .open(ModalWithInputsViewComponent, {
                centered: true
            })
            .result.then(() => {})
            .catch(() => {});
    }
}
