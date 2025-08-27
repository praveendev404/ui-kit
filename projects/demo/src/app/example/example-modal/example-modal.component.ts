import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-example-modal',
    templateUrl: './example-modal.component.html',
    standalone: false
})
export class ExampleModalComponent implements OnInit {
    toolSelection = true;

    items: { label: string; value: any }[] = [
        { label: 'John', value: 'John' },
        { label: 'Mike', value: 'Mike' },
        { label: 'Alex', value: 'Alex' }
    ];

    selectedUsers: any[] = ['John', 'Mike'];

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit(): void {}
}
