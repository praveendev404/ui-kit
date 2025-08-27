import { Component } from '@angular/core';
import { SideMenuItem } from '@dagility-ui/kit';
import { SIDE_MENU_ITEMS } from '../menu-model/side-menu.model';

@Component({
    selector: 'app-side-menu-with-header',
    templateUrl: './side-menu-with-header.component.html',
    standalone: false
})
export class SideMenuWithHeaderComponent {
    menu: SideMenuItem[] = SIDE_MENU_ITEMS;
}
