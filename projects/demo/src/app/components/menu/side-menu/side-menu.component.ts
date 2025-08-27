import { Component } from '@angular/core';
import { SideMenuItem } from '@dagility-ui/kit';
import { SIDE_MENU_ITEMS } from '../menu-model/side-menu.model';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    standalone: false
})
export class SideMenuComponent {
    menu: SideMenuItem[] = SIDE_MENU_ITEMS;
}
