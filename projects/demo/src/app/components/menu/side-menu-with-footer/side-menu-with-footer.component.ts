import { Component } from '@angular/core';
import { SideMenuItem } from '@dagility-ui/kit';
import { SIDE_MENU_ITEMS } from '../menu-model/side-menu.model';

@Component({
    selector: 'app-side-menu-with-footer',
    templateUrl: './side-menu-with-footer.component.html',
    standalone: false
})
export class SideMenuWithFooterComponent {
    menu: SideMenuItem[] = SIDE_MENU_ITEMS;
}
