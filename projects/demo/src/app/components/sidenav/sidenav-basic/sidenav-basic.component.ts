import { Component } from '@angular/core';
import { SidenavItems } from '@dagility-ui/kit';

@Component({
    selector: 'app-sidenav-basic',
    templateUrl: './sidenav-basic.component.html',
    styleUrls: ['./sidenav-basic.component.scss'],
    standalone: false
})
export class SidenavBasicComponent {
    sidenavItems: SidenavItems = [
        {
            title: 'Users',
            routerLink: 'users',
            icon: ['cube', [12, 12]],
            data: {
                count: 5
            }
        },
        {
            title: 'Products Test Very Long Name ',
            routerLink: 'products',
            icon: ['cube', [12, 12]],
            data: {
                count: 3
            }
        },
        {
            title: 'Reviews',
            routerLink: 'reviews'
        }
    ];
}
