import { Component, ContentChild, HostBinding, Input } from '@angular/core';

import {
    CardFooterTemplateDirective,
    CardHeaderTemplateDirective
} from './card.directive';

@Component({
    selector: 'lib-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    host: { class: 'lib-card' },
    standalone: false
})
export class CardComponent {
    @HostBinding('class.static-card') @Input() staticCard: boolean;

    @HostBinding('class.with-shadow') @Input() withShadow: boolean;

    @ContentChild(CardHeaderTemplateDirective, { static: true })
    headerTemplate: CardHeaderTemplateDirective;

    @ContentChild(CardFooterTemplateDirective, { static: true })
    footerTemplate: CardFooterTemplateDirective;
}
