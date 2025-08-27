import { Component } from '@angular/core';
import { facCheck, HeaderItem } from '@dagility-ui/kit';
import { of } from 'rxjs';

@Component({
    selector: 'app-navbar-menu-with-special-items',
    templateUrl: './navbar-menu-with-special-items.component.html',
    standalone: false
})
export class NavbarMenuWithSpecialItemsComponent {
    menuItems: HeaderItem[] = [
        { label: 'Menu 1', routerLink: '/components/menu', active$: of(true) },
        { label: 'Menu 2', routerLink: '/components/menu', active$: of(true) },
        { label: 'Menu 3', routerLink: '/components/menu', active$: of(true) },
        {
            label: 'Menu 1',
            routerLink: '/components/menu',
            active$: of(true),
            icon: facCheck,
            specialItem: true
        }
    ];
}
