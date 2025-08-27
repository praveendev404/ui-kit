import { Component } from '@angular/core';
import { HeaderItem } from '@dagility-ui/kit';
import {of} from 'rxjs';

@Component({
    selector: 'app-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    standalone: false
})
export class NavbarMenuComponent {
    menuItems: HeaderItem[] = [
        { label: 'Menu 1', routerLink: '/components/menu', active$: of(true) },
        { label: 'Menu 2', routerLink: '/components/menu', active$: of(true) },
        { label: 'Menu 3', routerLink: '/components/menu', active$: of(true) },
    ];
}
