import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'lib-info-box',
    templateUrl: './info-box.component.html',
    styleUrl: './info-box.component.css',
    host: {
        class: 'p-2 d-flex body2 align-items-center',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InfoBoxComponent {}
