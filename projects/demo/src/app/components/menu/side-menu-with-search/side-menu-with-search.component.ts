import { Component } from '@angular/core';
import { SideMenuItem } from '@dagility-ui/kit';
import { SIDE_MENU_ITEMS } from '../menu-model/side-menu.model';

@Component({
    selector: 'app-side-menu-with-search',
    templateUrl: './side-menu-with-search.component.html',
    standalone: false
})
export class SideMenuWithSearchComponent {
    menu: SideMenuItem[] = SIDE_MENU_ITEMS;
}
