import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    HostListener,
    Injectable,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { combineLatest, Observable, of, Subject, Subscription } from 'rxjs';
import { filter, map, startWith, take, takeUntil } from 'rxjs/operators';

import {
    SidenavItem,
    SidenavItemFlatGroup,
    SidenavItemGroup,
    SidenavItems
} from '../../types/sidenav-item';
import {
    SidenavFooterDirective,
    SidenavHeaderDirective,
    SidenavItemPostfixDirective
} from '../../directives/sidenav.directives';
import { HoveredService } from '../../../../services/hovered.service';
import { FocusMonitor } from '../../../../services/focus-monitor.service';

export type SidenavMode = 'over' | 'push';

@Component({
    selector: 'lib-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'lib-sidenav',
        '[class.lib-sidenav-over]': 'mode === "over"',
        '[class.lib-sidenav-push]': 'mode === "push"'
    },
    providers: [FocusMonitor],
    standalone: false
})
export class SidenavComponent implements OnChanges, OnInit, OnDestroy {
    @Input() mode: SidenavMode | null = null;

    @Input() @HostBinding('class.sidenav-expanded') expanded: boolean = false;

    @Input() items: SidenavItems;

    @Input() hasScrollbar: boolean;

    @Input() exactLinkActive = true;

    @Input() disableCollapseMode = false;

    @Input() loading = false;

    @Output() expandedChange = new EventEmitter<boolean>();

    @Output() modeChange = new EventEmitter<SidenavMode>();

    @Output() itemClicked = new EventEmitter<SidenavItem>();

    @Output() groupClicked = new EventEmitter<
        SidenavItemGroup & { parentId: number }
    >();

    @ContentChild(SidenavHeaderDirective, { static: true })
    headerTemplate: SidenavHeaderDirective;

    @ContentChild(SidenavFooterDirective, { static: true })
    footerTemplate: SidenavFooterDirective;

    @ContentChild(SidenavItemPostfixDirective, { static: true })
    itemPostfixTemplate: SidenavItemPostfixDirective;

    private expandedSubscription = Subscription.EMPTY;

    private windowWidthMedia: MediaQueryList;

    private destroyed$ = new Subject();

    private modePassed = false;

    @HostBinding('class.sidenav-hovered') isHovered = false;

    constructor(
        private readonly elementRef: ElementRef<HTMLElement>,
        private readonly hovered: HoveredService,
        private readonly zone: NgZone,
        private readonly cdr: ChangeDetectorRef,
        private readonly focusMonitor: FocusMonitor,
        private readonly sidenavStorageService: SidenavStorageService
    ) {}

    @HostListener('mouseenter')
    onMouseEnter() {
        if (!this.expanded) {
            this.isHovered = true;
            this.cdr.detectChanges();
        }
    }

    @HostListener('mouseleave')
    onMouseLeave() {
        if (this.isHovered) {
            this.isHovered = false;
            this.cdr.detectChanges();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.mode && changes.mode.firstChange) {
            this.modePassed = true;
        }
    }

    async ngOnInit() {
        if (this.disableCollapseMode) {
            this.expanded = true;
            return;
        }

        this.listenWindowSize();
        if (!this.modePassed) {
            this.elementRef.nativeElement.parentElement.style.setProperty(
                'display',
                'none',
                'important'
            );
            this.sidenavStorageService
                .getMode()
                .pipe(takeUntil(this.destroyed$))
                .subscribe((mode) => {
                    if (this.mode !== mode) {
                        this.mode = mode;
                        this.expanded = mode === 'push';
                        this.expandedChange.emit(this.expanded);
                        this.modeChange.emit(mode);
                        this.cdr.markForCheck();
                    }
                    this.elementRef.nativeElement.parentElement.style.removeProperty(
                        'display'
                    );
                });
        }

        if (window.innerWidth <= 768) {
            return;
        }

        this.expanded = this.mode === 'push';
    }

    hoverElementSelectorFn(el: Element) {
        return el;
    }

    textElementSelectorFn(el: Element) {
        return el.children.namedItem('text-container');
    }

    handleExpand(value: boolean) {
        this.expanded = value;

        this.expandedChange.emit(this.expanded);

        if (!this.expanded) {
            return;
        }

        this.listenExpanded();
    }

    isSidenavItem(
        item: any
    ): SidenavItemGroup | SidenavItem | SidenavItemFlatGroup {
        return item;
    }

    handleSideNavItemClicked(menuItem: SidenavItem) {
        this.itemClicked.emit(menuItem);
    }

    handleSideNavItemGroupClicked(
        menuItem: SidenavItemGroup,
        id: number,
        event: MouseEvent
    ) {
        if (this.expanded) {
            event.preventDefault();
        }
        this.groupClicked.emit({ ...menuItem, parentId: id });
        this.changeMenuItemIsExpanded(menuItem);
        const sidenavItems = document.querySelectorAll('[sidenav-parent]');
        const parents = [menuItem.id ?? menuItem.title];
        const parentIds = [id.toString()];
        for (let i = 0; i < sidenavItems.length; i++) {
            const sidenav = sidenavItems.item(i);
            if (
                !parents.includes(
                    sidenav.attributes.getNamedItem('sidenav-parent').value
                )
            ) {
                continue;
            }

            const parentIdAttr = sidenav.attributes.getNamedItem(
                'sidenav-parent-id'
            );

            if (
                !menuItem.id &&
                parentIdAttr &&
                !parentIds.includes(parentIdAttr.value)
            ) {
                continue;
            }

            parents.push(sidenav.id);
            parentIds.push(parentIdAttr?.value);
            sidenav.classList.add(menuItem.isCollapsed ? 'd-flex' : 'd-none');
            sidenav.classList.remove(
                menuItem.isCollapsed ? 'd-none' : 'd-flex'
            );
        }
    }

    handlePinToggle() {
        this.expanded = !this.expanded;
        this.expandedChange.emit(this.expanded);

        const newMode: SidenavMode = this.expanded ? 'push' : 'over';
        this.mode = newMode;
        this.modeChange.emit(this.mode);
        this.sidenavStorageService.setMode(newMode);

        if (this.expanded) {
            this.expandedSubscription?.unsubscribe();
        }
    }

    private changeMenuItemIsExpanded(
        menuItem: SidenavItemGroup,
        value?: boolean
    ) {
        if (menuItem.isCollapsed === undefined) {
            menuItem.isCollapsed = true;
        }

        value = value || !menuItem.isCollapsed;
        menuItem.isCollapsed = value;

        menuItem.children.forEach((child: SidenavItem | SidenavItemGroup) => {
            const sidenavItemGroup = child as SidenavItemGroup;
            if (sidenavItemGroup.children) {
                this.changeMenuItemIsExpanded(sidenavItemGroup, value);
            }
        });
    }

    private listenExpanded(hasFocus = false, hasHover = false) {
        this.expandedSubscription?.unsubscribe();
        const { nativeElement } = this.elementRef;

        this.expandedSubscription = combineLatest([
            this.focusMonitor.monitor$(nativeElement).pipe(startWith(hasFocus)),
            this.hovered.createHovered$(nativeElement, hasFocus || hasHover),
        ])
            .pipe(
                map(([focused, hovered]) => {
                    const isPermanentlyExpanded = this.mode === 'push';

                    return !isPermanentlyExpanded && !focused && !hovered;
                }),
                filter(Boolean),
                take(1)
            )
            .subscribe(() => {
                this.zone.run(() => {
                    if (this.expanded && this.mode !== 'push') {
                        this.expanded = false;
                        this.expandedChange.emit(false);
                    }
                    this.cdr.markForCheck();
                });
            });
    }

    private handleMatchMedia = () => {
        if (this.disableCollapseMode) {
            return;
        }

        this.zone.run(() => {
            this.expanded = false;
            this.mode = 'over';
            this.modeChange.emit(this.mode);
            this.cdr.detectChanges();
        });
    };

    private listenWindowSize() {
        this.zone.runOutsideAngular(() => {
            this.windowWidthMedia = window.matchMedia('(max-width: 768px)');
            this.windowWidthMedia.addEventListener(
                'change',
                this.handleMatchMedia
            );
        });
    }

    ngOnDestroy() {
        this.windowWidthMedia?.removeEventListener(
            'change',
            this.handleMatchMedia
        );
        this.expandedSubscription?.unsubscribe();
        this.destroyed$.next();
    }
}

@Injectable({
    providedIn: 'root',
    useClass: forwardRef(() => SidenavLocalStorageService)
})
export abstract class SidenavStorageService {
    abstract setMode(mode: SidenavMode): void;

    abstract getMode(): Observable<SidenavMode>;
}

@Injectable({
    providedIn: 'root'
})
export class SidenavLocalStorageService implements SidenavStorageService {
    private storageKey = 'kit-sidenav-mode';

    setMode(mode: SidenavMode) {
        localStorage.setItem(this.storageKey, mode);
    }

    getMode(): Observable<SidenavMode> {
        return of(
            (localStorage.getItem(this.storageKey) as SidenavMode) || 'over'
        );
    }
}
