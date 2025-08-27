import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'lib-modal-header',
    templateUrl: './modal-header.component.html',
    styleUrl: './modal-header.component.scss',
    standalone: false
})
export class ModalHeaderComponent {
    @Input() title: string;
    @Output() dismiss = new EventEmitter<void>();

    constructor(public modal: NgbActiveModal) {}

    onDismiss() {
        if (this.dismiss.observers.length > 0) {
            this.dismiss.emit();

            return;
        }

        this.modal.dismiss('Cross click');
    }
}
