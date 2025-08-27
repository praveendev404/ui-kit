import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnDestroy,
    Output
} from '@angular/core';
import { CustomIcon } from '@dagility-ui/kit/icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Observable, Subject } from 'rxjs';
import { NavbarMenuItemAdditionalContentDirective, NavbarMenuSpecialItemsDirective } from './navbar-menu.directive';
import { takeUntil } from 'rxjs/operators';

export interface HeaderItem {
    label: string;
    routerLink: string;
    icon?: IconProp | CustomIcon | string;
    image?: string;
    module?: string;
    active$: Observable<boolean>;
    specialItem?: boolean;
    position?: number;
}

const DELAY_1S = 1000;
const LOGO_WIDTH = 192;
const CONTEXT_MENU_WIDTH = 200;

@Component({
    selector: 'lib-navbar-menu',
    templateUrl: './navbar-menu.component.html',
    styleUrls: ['./navbar-menu.component.scss'],
    standalone: false
})
export class NavbarMenuComponent
    implements AfterViewInit, OnChanges, OnDestroy {
    @Input() menuItems: HeaderItem[];

    @Input() menuItems$: Observable<HeaderItem[]>;

    @Input() limitedWidth: number = LOGO_WIDTH + CONTEXT_MENU_WIDTH;

    @ContentChild(NavbarMenuSpecialItemsDirective, { static: true })
    navbarMenuSpecialItemsDirective: NavbarMenuSpecialItemsDirective;

    @ContentChild(NavbarMenuItemAdditionalContentDirective, {static: true})
    navbarMenuItemAdditionalContent: NavbarMenuItemAdditionalContentDirective;

    @Output() collapsed$ = new EventEmitter<boolean>();

    collapsed = false;

    private destroyed$ = new Subject();

    constructor(private elRef: ElementRef) {}

    ngAfterViewInit() {
        if (this.menuItems$) {
            this.menuItems$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
                setTimeout(() => {
                    this.checkCollapse();
                }, DELAY_1S);
            });
        }
    }

    ngOnChanges() {
        setTimeout(() => {
            this.checkCollapse();
        }, DELAY_1S);
    }

    @HostListener('window:resize')
    onResize() {
        this.checkCollapse();
    }

    checkCollapse() {
        const navBar: HTMLElement = (<HTMLElement>this.elRef.nativeElement)
            ?.getElementsByClassName('navbar-nav')
            ?.item(0) as HTMLElement;

        if (!navBar) {
            return;
        }

        this.collapsed =
            window.innerWidth - navBar.getBoundingClientRect().width <
            this.limitedWidth;

        navBar.style.position = this.collapsed ? 'absolute' : 'static';
        navBar.style.top = this.collapsed ? '-1000px' : '';

        this.collapsed$.next(this.collapsed);
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
