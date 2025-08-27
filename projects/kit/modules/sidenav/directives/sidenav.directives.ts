import { Directive, TemplateRef } from '@angular/core';
import {
    SidenavItem,
    SidenavItemFlatGroup,
    SidenavItemGroup
} from '../types/sidenav-item';

interface SidenavContext {
    expanded: boolean;
}

interface SidenavItemContext extends SidenavContext {
    item: SidenavItemGroup | SidenavItem | SidenavItemFlatGroup;
}

@Directive({
    selector: '[libSidenavHeader]',
    standalone: false
})
export class SidenavHeaderDirective {
    constructor(public readonly template: TemplateRef<SidenavContext>) {}
}

@Directive({
    selector: '[libSidenavFooter]',
    standalone: false
})
export class SidenavFooterDirective {
    constructor(public readonly template: TemplateRef<SidenavContext>) {}
}

@Directive({
    selector: '[libSidenavItemPostfix]',
    standalone: false
})
export class SidenavItemPostfixDirective {
    constructor(public readonly template: TemplateRef<SidenavItemContext>) {}
}
