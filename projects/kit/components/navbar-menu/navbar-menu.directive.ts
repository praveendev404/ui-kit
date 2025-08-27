import { Directive, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[navbarSpecialItem]',
    standalone: false
})
export class NavbarMenuSpecialItemsDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'ng-template[navbarItemAdditionalContent]',
    standalone: false
})
export class NavbarMenuItemAdditionalContentDirective {
    constructor(public template: TemplateRef<any>) {}
}
