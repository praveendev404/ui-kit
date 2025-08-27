import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'lib-insight-card',
    templateUrl: './insight-card.component.html',
    styleUrls: ['./insight-card.component.scss'],
    standalone: false
})
export class InsightCardComponent {
    @HostBinding('class')
    @Input()
    color: 'primary' | 'success' | 'warning' | 'danger' = 'primary';

    @HostBinding('class.active')
    @Input()
    active = false;

    @Input() loading = false;

    @HostBinding('class.disabled')
    @Input()
    disabled = false;

    @Input() title: string;

    @Input() value: string | number;

    @Input() unit: string;
}
