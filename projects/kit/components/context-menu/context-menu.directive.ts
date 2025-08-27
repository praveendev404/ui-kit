import { Directive, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[buttonTemplate]',
    standalone: false
})
export class ContextButtonDirective {
    constructor(public template: TemplateRef<any>) {}
}


@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[specialItems]',
    standalone: false
})
export class ContextSpecialItemsDirective {
    constructor(public template: TemplateRef<any>) {}
}
