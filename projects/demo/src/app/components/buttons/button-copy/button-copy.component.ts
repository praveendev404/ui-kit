import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-button-copy',
    templateUrl: './button-copy.component.html',
    standalone: false
})
export class ButtonCopyComponent {
    text: string = 'lorem ipsum';

    constructor(private toastr: ToastrService) {}

    handleCopied() {
        this.toastr.info('copied');
    }
}
