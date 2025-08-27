import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-with-inputs-view',
    templateUrl: './modal-with-inputs-view.component.html',
    standalone: false
})
export class ModalWithInputsViewComponent {
    constructor(public activeModal: NgbActiveModal) {}
}
