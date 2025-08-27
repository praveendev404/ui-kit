import { Component } from '@angular/core';
import { useWaitingModal } from '@dagility-ui/kit';

@Component({
    selector: 'app-waiting-modal',
    templateUrl: './waiting-modal.component.html',
    standalone: false
})
export class WaitingModalComponent {
    waitingModal = useWaitingModal();

    show() {
        const ref = this.waitingModal.open('...loading');

        setTimeout(() => {
            ref.close();
        }, 3000);
    }
}
