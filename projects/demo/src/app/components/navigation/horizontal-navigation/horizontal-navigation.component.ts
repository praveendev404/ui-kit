import { Component } from '@angular/core';
import { ContextMenuItem, NavItemDirective } from '@dagility-ui/kit';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-horizontal-navigation',
    templateUrl: './horizontal-navigation.component.html',
    styleUrls: ['./horizontal-navigation.component.scss'],
    standalone: false
})
export class HorizontalNavigationComponent {
    navItemsWithContextMenu = [
        {
            navItemName: 'Nav 1',
            navItemLink: '/components/navigation'
        },
        {
            navItemName: 'Nav 2',
            navItemContextMenuItems: [
                {
                    name: 'Child 1',
                    routerLink: '/components/context-menu'
                },
                {
                    name: 'Child 2',
                    routerLink: '/components/context-menu'
                },
                {
                    name: 'Child 3',
                    routerLink: '/components/context-menu'
                }
            ]
        },
        {
            navItemName: 'Nav 3',
            navItemLink: '/components/breadcrumb'
        },
        {
            navItemName: 'Nav 4',
            navItemContextMenuItems: [
                {
                    name: 'Another Child 1',
                    routerLink: '/components/menu'
                },
                {
                    name: 'Another Child 2',
                    routerLink: '/components/menu'
                }
            ]
        }
    ];

    horizontalItems = [
        {
            id: 'nav1',
            navItemName: 'Nav 1'
        },
        {
            id: 'nav2',
            navItemName: 'Nav 2 with lazy loading items',
            navItemContextMenuItems: [
                {
                    name: 'Loading items...'
                }
            ]
        }
    ];

    onItemClicked(navItem: NavItemDirective | ContextMenuItem) {
        if (navItem instanceof NavItemDirective) {
            if (
                navItem.navItemId !== 'nav2' ||
                navItem.props.childrenRequested
            ) {
                return;
            }
            navItem.props.childrenRequested = true;
            of(navItem.navItemId)
                .pipe(delay(1000))
                .subscribe(() => {
                    navItem.navItemContextMenuItems = [
                        {
                            name: 'Child 1'
                        },
                        {
                            name: 'Child 2',
                            routerLink: '/child-route2'
                        }
                    ];
                });
        } else {
            if (navItem.name === 'Child 1') {
                alert('Child clicked');
            }
        }
    }
}
