import {Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import {
    ContextButtonDirective,
    ContextSpecialItemsDirective
} from './context-menu.directive';
import { CustomIcon } from '@dagility-ui/kit/icons';
import { Placement } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'lib-context-menu',
    templateUrl: './context-menu.component.html',
    styleUrls: ['./context-menu.component.scss'],
    standalone: false
})
export class ContextMenuComponent {
    @Input() menuItems: ContextMenuItem[];

    @Input() placement: Placement = 'bottom-right';

    @Output() itemClicked = new EventEmitter<ContextMenuItem>();

    @ContentChild(ContextButtonDirective, { static: true })
    buttonTemplate: ContextButtonDirective;

    @ContentChild(ContextSpecialItemsDirective, { static: true })
    contextSpecialItemsTemplate: ContextSpecialItemsDirective;

    isOpened = false;
}

export interface ContextMenuItem {
    name: string;
    link?: string;
    routerLink?: string;
    icon?: CustomIcon | IconProp | string;
}
