import {
    AfterViewInit,
    Component,
    ContentChild,
    HostListener,
    Input,
    OnInit,
    Output
} from '@angular/core';
import { Subject } from 'rxjs';
import {
    SideMenuChildItemDirective,
    SideMenuFooterDirective,
    SideMenuHeaderDirective,
    SideMenuItemDirective
} from './side-menu.directive';

@Component({
    selector: 'lib-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss'],
    host: {
        class: 'd-flex'
    },
    standalone: false
})
export class SideMenuComponent implements OnInit, AfterViewInit {
    @Input() menuItems: SideMenuItem[];

    @Input() hasSearch = false;

    @Output() sideMenuClicked = new Subject();

    @Output() sideSubMenuClicked = new Subject();

    @ContentChild(SideMenuHeaderDirective, { static: true })
    sideMenuHeaderDirective: SideMenuHeaderDirective;

    @ContentChild(SideMenuItemDirective, { static: true })
    sideMenuItemTemplate: SideMenuItemDirective;

    @ContentChild(SideMenuChildItemDirective, { static: true })
    sideMenuChildItemTemplate: SideMenuChildItemDirective;

    @ContentChild(SideMenuFooterDirective, { static: true })
    sideMenuFooterDirective: SideMenuFooterDirective;

    activeMenu: any = {};

    hamburgerMenu = false;

    items: SideMenuItem[];

    ngOnInit() {
        this.items = this.menuItems;
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.hamburgerMenu = !document.getElementsByClassName(
                'side-menu-overlay'
            )[0]?.children[0];
        });
    }

    @HostListener('window:resize')
    onResize() {
        const els = document.getElementsByClassName('side-menu');
        for (let i = 0; i < els.length; i++) {
            const el = els.item(i);
            el.classList.add(window.innerWidth > 1000 ? 'd-block' : 'd-none');
            el.classList.remove(
                window.innerWidth <= 1000 ? 'd-block' : 'd-none'
            );
        }
    }

    handleClick(menuItem: any, menuClicked: Subject<any>, event: Event) {
        this.activeMenu = menuItem;
        menuClicked.next(menuItem);
        menuItem.opened = !menuItem.opened;
        event.stopPropagation();
    }

    search(str: string) {
        this.items = JSON.parse(
            JSON.stringify(
                this.menuItems.filter(
                    item =>
                        item.title.toLowerCase().includes(str.toLowerCase()) ||
                        (item.children &&
                            item.children.some(child =>
                                child.title
                                    .toLowerCase()
                                    .includes(str.toLowerCase())
                            ))
                )
            )
        );
        this.items.forEach(item => {
            if (item.children) {
                item.children = item.children.filter(child =>
                    child.title.toLowerCase().includes(str.toLowerCase())
                );
            }
        });
    }

    handleOverlay(show: boolean) {
        if (window.innerWidth > 1000) {
            return;
        }
        const els = document.getElementsByClassName('side-menu');
        for (let i = 0; i < els.length; i++) {
            const el = els.item(i);
            if (show) {
                el.classList.add('d-block', 'w-200');
                el.classList.remove('d-none');
            } else {
                el.classList.remove('d-block', 'w-200');
                el.classList.add('d-none');
            }
        }
    }
}

export interface SideMenuItem {
    title: string;
    routerLink?: string;
    opened?: boolean;
    children?: SideMenuChild[];
}

export interface SideMenuChild {
    title: string;
    routerLink?: string;
    opened?: boolean;
    children?: SideMenuChild[];
}
