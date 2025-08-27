import {Directive, TemplateRef} from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[footerTemplate]',
    standalone: false
})
export class ToastrFooterTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[bodyTemplate]',
    standalone: false
})
export class ToastrBodyTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}
