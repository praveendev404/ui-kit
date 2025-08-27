import { Directive, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[headerTemplate]',
    standalone: false
})
export class CardHeaderTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[footerTemplate]',
    standalone: false
})
export class CardFooterTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}
