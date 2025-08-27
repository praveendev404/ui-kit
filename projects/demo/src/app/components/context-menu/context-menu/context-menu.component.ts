import { Component } from '@angular/core';
import { ContextMenuItem, facCheck } from '@dagility-ui/kit';

@Component({
    selector: 'app-context-menu',
    templateUrl: './context-menu.component.html',
    standalone: false
})
export class ContextMenuComponent {
    icons = {
        facCheck: facCheck
    };

    menuItems: ContextMenuItem[] = [
        {
            name: 'Help',
            routerLink: '/components/context-menu',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/context-menu',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/context-menu',
            icon: facCheck
        },
        {
            name: 'Help',
            routerLink: '/components/context-menu',
            icon: facCheck
        }
    ];
}
