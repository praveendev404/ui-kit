import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-with-buttons-view',
    templateUrl: './modal-with-buttons-view.component.html',
    standalone: false
})
export class ModalWithButtonsViewComponent {
    constructor(public activeModal: NgbActiveModal) {}
}
