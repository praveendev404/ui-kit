import { Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'label[radio-block]',
    template: '<ng-content></ng-content>',
    styleUrl: './radio-block.component.scss',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class RadioBlockComponent {
    @HostBinding('attr.selection-mode') @Input() selectionMode: 'outline' | 'fill' = 'outline';
}
