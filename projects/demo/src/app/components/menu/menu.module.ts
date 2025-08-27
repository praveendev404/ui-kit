import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { SideMenuWithSearchComponent } from './side-menu-with-search/side-menu-with-search.component';
import { SideMenuWithCustomChildComponent } from './side-menu-with-custom-child/side-menu-with-custom-child.component';
import { NavbarMenuWithSpecialItemsComponent } from './navbar-menu-with-special-items/navbar-menu-with-special-items.component';
import { NavbarMenuWithObservableComponent } from './navbar-menu-with-observable/navbar-menu-with-observable.component';
import { SideMenuWithHeaderComponent } from './side-menu-with-header/side-menu-with-header.component';
import { SideMenuWithFooterComponent } from './side-menu-with-footer/side-menu-with-footer.component';

const DEMOS: Record<string, any> = {
    'navbar-menu': {
        title: 'Navbar Menu',
        code: 'menu/navbar-menu/navbar-menu.component.ts',
        markup: 'menu/navbar-menu/navbar-menu.component.html',
        type: NavbarMenuComponent
    },
    'navbar-menu-with-observable': {
        title: 'Navbar Menu With Observable Items',
        code: 'menu/navbar-menu-with-observable/navbar-menu-with-observable.component.ts',
        markup: 'menu/navbar-menu-with-observable/navbar-menu-with-observable.component.html',
        type: NavbarMenuWithObservableComponent
    },
    'navbar-menu-with-special-items': {
        title: 'Navbar Menu With Special Items',
        code: 'menu/navbar-menu-with-special-items/navbar-menu-with-special-items.component.ts',
        markup: 'menu/navbar-menu-with-special-items/navbar-menu-with-special-items.component.html',
        type: NavbarMenuWithSpecialItemsComponent
    },
    'side-menu': {
        title: 'Side Menu',
        code: 'menu/side-menu/side-menu.component.ts',
        markup: 'menu/side-menu/side-menu.component.html',
        type: SideMenuComponent
    },
    'side-menu-with-search': {
        title: 'Side Menu With Search',
        code: 'menu/side-menu-with-search/side-menu-with-search.component.ts',
        markup: 'menu/side-menu-with-search/side-menu-with-search.component.html',
        type: SideMenuWithSearchComponent
    },
    'side-menu-with-header': {
        title: 'Side Menu With Header',
        code: 'menu/side-menu-with-header/side-menu-with-header.component.ts',
        markup: 'menu/side-menu-with-header/side-menu-with-header.component.html',
        type: SideMenuWithHeaderComponent
    },
    'side-menu-with-custom-child': {
        title: 'Side Menu With Custom Child',
        code: 'menu/side-menu-with-custom-child/side-menu-with-custom-child.component.ts',
        markup: 'menu/side-menu-with-custom-child/side-menu-with-custom-child.component.html',
        type: SideMenuWithCustomChildComponent
    },
    'side-menu-with-footer': {
        title: 'Side Menu With Footer',
        code: 'menu/side-menu-with-footer/side-menu-with-footer.component.ts',
        markup: 'menu/side-menu-with-footer/side-menu-with-footer.component.html',
        type: SideMenuWithFooterComponent
    }
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS }
            }
        ])
    ],
    declarations: [
        NavbarMenuComponent,
        SideMenuComponent,
        SideMenuWithSearchComponent,
        SideMenuWithCustomChildComponent,
        NavbarMenuWithSpecialItemsComponent,
        NavbarMenuWithObservableComponent,
        SideMenuWithHeaderComponent,
        SideMenuWithFooterComponent
    ]
})
export class MenuModule {}
