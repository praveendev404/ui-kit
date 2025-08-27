import { Component } from '@angular/core';
import { ModalService } from '@dagility-ui/kit';
import { ModalBasicViewComponent } from './modal-basic-view/modal-basic-view.component';

@Component({
    selector: 'app-modal-basic',
    templateUrl: './modal-basic.component.html',
    standalone: false
})
export class ModalBasicComponent {
    constructor(private modalService: ModalService) {}

    openModal() {
        this.modalService
            .open(ModalBasicViewComponent, {
                centered: true
            })
            .result.then(() => {})
            .catch(() => {});
    }
}
