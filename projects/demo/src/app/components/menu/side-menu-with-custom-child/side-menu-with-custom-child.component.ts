import { Component } from '@angular/core';
import { SideMenuItem } from '@dagility-ui/kit';
import { SIDE_MENU_ITEMS } from '../menu-model/side-menu.model';

@Component({
    selector: 'app-side-menu-with-custom-child',
    templateUrl: './side-menu-with-custom-child.component.html',
    standalone: false
})
export class SideMenuWithCustomChildComponent {
    menu: SideMenuItem[] = SIDE_MENU_ITEMS;
}
