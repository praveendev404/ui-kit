import { Directive, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[sideMenuHeaderTemplate]',
    standalone: false
})
export class SideMenuHeaderDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[sideMenuItemTemplate]',
    standalone: false
})
export class SideMenuItemDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[sideMenuChildItemTemplate]',
    standalone: false
})
export class SideMenuChildItemDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[sideMenuFooterTemplate]',
    standalone: false
})
export class SideMenuFooterDirective {
    constructor(public template: TemplateRef<any>) {}
}

