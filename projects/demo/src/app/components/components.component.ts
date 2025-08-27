import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SideMenuItem } from '@dagility-ui/kit';
import { PerfectScrollbarComponent } from 'perfect-scrollbar-angular';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-components',
    templateUrl: './components.component.html',
    styleUrls: ['./components.component.scss'],
    standalone: false
})
export class ComponentsComponent implements OnDestroy {
    @ViewChild('perfectScrollbar', { static: true })
    perfectScrollbar: PerfectScrollbarComponent;

    get component() {
        if (this.router.url.includes('spacers')) {
            return this.router.url.slice('components/spacers'.length + 2);
        }
        if (this.router.url.includes('colors')) {
            return this.router.url
                .replace('-', ' ')
                .slice('components/colors'.length + 2);
        }
        if (this.router.url.includes('icons')) {
            return this.router.url
                .replace('-', ' ')
                .slice('components/icons'.length + 2);
        }
        return this.router.url.replace('-', ' ').slice('components'.length + 2);
    }

    menu: SideMenuItem[] = [
        {
            title: 'Components',
            routerLink: '/components',
            opened: true,
            children: [
                { title: 'Breadcrumb', routerLink: '/components/breadcrumb' },
                { title: 'Buttons', routerLink: '/components/buttons' },
                { title: 'Cards', routerLink: '/components/cards' },
                { title: 'Checkbox', routerLink: '/components/checkbox' },
                {
                    title: 'Context Menu',
                    routerLink: '/components/context-menu'
                },
                { title: 'Data-Grid', routerLink: '/components/data-grid' },
                { title: 'Datepicker', routerLink: '/components/datepicker' },
                { title: 'Dropdown', routerLink: '/components/dropdown' },
                {
                    title: 'Treelike Dropdown',
                    routerLink: '/components/treelike-dropdown'
                },
                {
                    title: 'Treelike Menu',
                    routerLink: '/components/treelike-menu'
                },
                {
                    title: 'Expansion Panel',
                    routerLink: '/components/expansion-panel'
                },
                { title: 'Input', routerLink: '/components/input' },
                {
                    title: 'Insight Cards',
                    routerLink: '/components/insight-cards'
                },
                { title: 'Menu', routerLink: '/components/menu' },
                { title: 'Navigation', routerLink: '/components/navigation' },
                { title: 'Pagination', routerLink: '/components/pagination' },
                { title: 'Popups', routerLink: '/components/popups' },
                { title: 'Rating', routerLink: '/components/rating' },
                { title: 'Scrollbar', routerLink: '/components/scrollbar' },
                { title: 'Search', routerLink: '/components/search' },
                { title: 'Sidenav', routerLink: '/components/sidenav' },
                { title: 'Spinner', routerLink: '/components/spinner' },
                { title: 'Textarea', routerLink: '/components/textarea' },
                { title: 'Typeahead', routerLink: '/components/typeahead' },
                { title: 'Typography', routerLink: '/components/typography' },
                {
                    title: 'Stream Wrapper',
                    routerLink: '/components/stream-wrapper'
                },
                {
                    title: 'Assist AI',
                    routerLink: '/components/assist-ai',
                }
            ]
        },
        {
            title: 'Colors',
            routerLink: '/components/colors/base-colors',
            opened: true,
            children: [
                {
                    title: 'Base Colors',
                    routerLink: '/components/colors/base-colors'
                },
                {
                    title: 'Borders Colors',
                    routerLink: '/components/colors/borders-colors'
                },
                {
                    title: 'Button Colors',
                    routerLink: '/components/colors/button-colors'
                },
                {
                    title: 'Hover Colors',
                    routerLink: '/components/colors/hover-colors'
                },
                {
                    title: 'Other Colors',
                    routerLink: '/components/colors/other-colors'
                },
                {
                    title: 'Typography Colors',
                    routerLink: '/components/colors/typography-colors'
                }
            ]
        },
        {
            title: 'Spacers',
            routerLink: '/components/spacers/padding',
            opened: true,
            children: [
                { title: 'Padding', routerLink: '/components/spacers/padding' },
                {
                    title: 'Margin',
                    routerLink: '/components/spacers/margin'
                }
            ]
        },
        {
            title: 'Icons',
            routerLink: '/components/icons/custom-icons',
            opened: true,
            children: [
                {
                    title: 'Custom Icons',
                    routerLink: '/components/icons/custom-icons'
                }
            ]
        }
    ];

    private routerChangeSubscription: Subscription;

    constructor(private router: Router) {
        this.setRouterChange$();
    }

    setRouterChange$() {
        this.routerChangeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                setTimeout(() => {
                    this.perfectScrollbar?.directiveRef?.scrollToY(0);
                });
            }
        });
    }

    ngOnDestroy() {
        this.routerChangeSubscription.unsubscribe();
    }
}
