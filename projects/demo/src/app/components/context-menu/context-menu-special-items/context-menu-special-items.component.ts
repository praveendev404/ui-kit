import { Component } from '@angular/core';
import {ContextMenuItem, facCheck} from '@dagility-ui/kit';

@Component({
    selector: 'app-context-menu-special-items',
    templateUrl: './context-menu-special-items.component.html',
    styleUrls: [
        '../../../../../../kit/components/context-menu/context-menu.component.scss'
    ],
    standalone: false
})
export class ContextMenuSpecialItemsComponent {
    icons = {
        facCheck: facCheck,
    };

    menuItems: ContextMenuItem[] = [
        {
            name: 'Help',
            routerLink: '/components/navigation',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/navigation',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/navigation',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/navigation',
            icon: facCheck
        }
    ];

    handleClick() {
        console.log('Action');
    }
}
