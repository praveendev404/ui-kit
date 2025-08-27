import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-basic-view',
    templateUrl: './modal-basic-view.component.html',
    standalone: false
})
export class ModalBasicViewComponent {
    constructor(public activeModal: NgbActiveModal) {}
}
