import {
    ChangeDetectorRef,
    Component,
    ContentChild,
    Input
} from '@angular/core';
import { CardExpandedTemplateDirective } from './card-with-status.directive';
import { CardStatus } from '../../models/card-with-status/card-with-status.model';
import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';

@Component({
    selector: 'lib-card-with-status',
    templateUrl: './card-with-status.component.html',
    styleUrls: ['./card-with-status.component.scss'],
    animations: [
        trigger('expand', [
            state('collapsed, void', style({ height: '0px', opacity: '0', marginTop: '16px' })),
            state('expanded', style({ height: '*', opacity: '1', marginTop: '20px' })),
            transition('expanded <=> collapsed, void => collapsed', animate('225ms cubic-bezier(0.4,0.0,0.2,1)'))
        ])
    ],
    standalone: false
})
export class CardWithStatusComponent {
    @Input() status: CardStatus;
    @Input() statusMapper: Record<string, string> = {};

    @ContentChild(CardExpandedTemplateDirective, { static: true })
    cardExpandedTemplate: CardExpandedTemplateDirective;

    get statusValue() {
        const status = this.status.value.toLowerCase();
        if (status === 'default') {
            return 'default';
        }

        return this.statusMapper[this.status.value.toLowerCase()];
    }

    expanded = false;

    constructor(public cdr: ChangeDetectorRef) {}
}
