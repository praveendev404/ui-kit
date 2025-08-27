import {
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    Directive,
    HostBinding,
    Input,
    Output,
    QueryList,
    TemplateRef,
    EventEmitter,
    booleanAttribute,
    input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbMode, BreadcrumbService } from './breadcrumb.service';

@Directive()
export class BreadcrumbItem {
    breadcrumbClick: EventEmitter<MouseEvent>;
    template: TemplateRef<unknown> = null;

    link = () => null as RouterLink['routerLink'];

    get fake() {
        return false;
    }
}

@Directive({
    selector: 'ng-template[libBreadcrumb]:not([link])',
    providers: [
        { provide: BreadcrumbItem, useExisting: BreadcrumbItemDirective },
    ],
    exportAs: 'libBreadcrumb',
    standalone: false
})
export class BreadcrumbItemDirective extends BreadcrumbItem {
    @Input({ transform: booleanAttribute }) active: boolean;
    @Output() breadcrumbClick = new EventEmitter();

    get fake() {
        return !this.breadcrumbClick.observers.length;
    }

    constructor(public template: TemplateRef<unknown>) {
        super();
    }
}

@Directive({
    selector: 'ng-template[libBreadcrumb][link]',
    providers: [
        { provide: BreadcrumbItem, useExisting: BreadcrumbLinkDirective },
    ],
    standalone: false
})
export class BreadcrumbLinkDirective extends BreadcrumbItem {
    link = input.required<RouterLink['routerLink']>();

    constructor(public template: TemplateRef<unknown>) {
        super();
    }
}

@Component({
    selector: 'lib-breadcrumb, nav[libBreadcrumb]',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class BreadcrumbComponent {
    @Input()
    @HostBinding('attr.breadcrumb-mode')
    mode: BreadcrumbMode = this.breadcrumbService.getMode();

    @HostBinding('class.breadcrumb') get isBootstrap() {
        return this.mode === 'bootstrap';
    }

    @ContentChildren(BreadcrumbItem)
    items: QueryList<BreadcrumbItem>;

    constructor(public breadcrumbService: BreadcrumbService) {}

    isActive(item: BreadcrumbItem) {
        return item instanceof BreadcrumbItemDirective ? item.active : null;
    }

    isFake(item: BreadcrumbItem) {
        if (item instanceof BreadcrumbItemDirective) {
            return item.fake;
        }

        return !item.link?.();
    }
}
