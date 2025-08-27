import { Component } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { faCalendar, faCubes} from '@fortawesome/free-solid-svg-icons';

import { HeaderItem } from '@dagility-ui/kit';

@Component({
    selector: 'app-navbar-menu-with-observable',
    templateUrl: './navbar-menu-with-observable.component.html',
    standalone: false
})
export class NavbarMenuWithObservableComponent {
    icons = {
        faCubes: faCubes,
        faCalendar: faCalendar
    };

    menuItems$ = new BehaviorSubject<HeaderItem[]>([
        {
            label: 'Menu 1',
            routerLink: '/components/menu',
            icon: this.icons.faCubes,
            active$: of(true),
        },
        {
            label: 'Menu 2',
            icon: this.icons.faCubes,
            routerLink: '/components/menu1',
            active$: of(true),
        },
        {
            label: 'Menu 3',
            icon: this.icons.faCalendar,
            routerLink: '/components/menu',
            active$: of(true),
        },
        {
            label: 'Menu 4',
            routerLink: '/components/menu1',
            icon: this.icons.faCalendar,
            active$: of(true),
        },
    ]);

    constructor() {}
}
