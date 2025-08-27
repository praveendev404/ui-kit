import { Component } from '@angular/core';
import { HeaderItem } from '@dagility-ui/kit';
import { of } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent {
    topMenuItems: HeaderItem[] = [
        {
            label: 'Getting Started',
            routerLink: '/getting-started',
            active$: of(true)
        },
        { label: 'Components', routerLink: '/components', active$: of(true) },
        { label: 'Example', routerLink: '/example', active$: of(true) }
    ];

    isDarkMode = false;

    changeTheme() {
        document.documentElement.dataset.theme = this.isDarkMode
            ? 'dark-da'
            : 'light-ust';
    }
}
