import {
    AfterViewChecked, AfterViewInit,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Input, OnDestroy,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {
    NgbNav,
    NgbNavChangeEvent,
    NgbNavLink
} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContextMenuItem } from '../context-menu/context-menu.component';
import { NavItemDirective } from './nav.directive';

@Component({
    selector: 'lib-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss'],
    standalone: false
})
export class NavComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    hiddenItems: any[] = [];
    tabSetWidth: number = 0;

    @Input() level: number = 1;
    @Input() activeId: string;
    @Input() destroyOnHide: boolean;
    @Input() defaultTabSetPadding: boolean = false;
    @Input() useHorizontalScroll = false;

    @Output() navChange: EventEmitter<NgbNavChangeEvent> = new EventEmitter<
        NgbNavChangeEvent
    >();
    @Output() navItemClick = new EventEmitter<
        NavItemDirective | ContextMenuItem
    >();

    @ViewChild(NgbNav) tabSet: NgbNav;
    @ViewChild('tabSet', { static: false }) tabSetElementRef: ElementRef;

    @ViewChild('container', { read: ElementRef }) container: ElementRef;

    @ContentChildren(NavItemDirective) navItems: QueryList<NavItemDirective>;

    @ContentChild('tabHeaderTmpl') tabHeaderTmpl: TemplateRef<any>;

    private destroyed$ = new Subject();

    constructor(private cdr: ChangeDetectorRef) {}

    @HostListener('window:resize')
    onResize() {
        if (this.useHorizontalScroll) {
            return;
        }
        let tabsWidth = 0;
        const items = this.navItems.toArray();
        this.resetItems();
        this.tabSetWidth =
            this.tabSetElementRef.nativeElement.offsetWidth -
            (this.level === 1 && !this.defaultTabSetPadding ? 80 : 30);
        this.tabSet.links.forEach((link: NgbNavLink, i: number) => {
            tabsWidth +=
                link.elRef.nativeElement.offsetWidth +
                (this.level < 2 ? 30 : 0);
            if (tabsWidth > this.tabSetWidth) {
                items[i].hidden = true;
                this.hiddenItems.push({
                    id: link.navItem.id,
                    name: items[i].navItemName,
                    routerLink: items[i].navItemLink
                });
            }
        });
        this.cdr.detectChanges();
    }

    ngAfterViewChecked() {
        if (this.tabSetWidth < 1) {
            this.onResize();
        }
    }

    ngAfterViewInit() {
        this.tabSet.navItemChange$.pipe(
            takeUntil(this.destroyed$)
        ).subscribe(activeId => {
            if (!activeId && this.tabSet.items.length) {
                this.activeId = this.tabSet.items.last.id;
            }
        })
    }

    resetItems() {
        this.hiddenItems = [];
        this.navItems.forEach(item => (item.hidden = false));
        this.cdr.detectChanges();
    }

    selectById(id: string) {
        this.tabSet.select(id);
    }

    onNavChange(e: NgbNavChangeEvent) {
        this.navChange.emit(e);
    }

    onNavItemClick(item: NavItemDirective | ContextMenuItem) {
        this.navItemClick.emit(item);
    }

    ngOnDestroy() {
        this.destroyed$.next();
    }
}
