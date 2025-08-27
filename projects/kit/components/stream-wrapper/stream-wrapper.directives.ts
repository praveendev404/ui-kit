import { TemplateRef, Directive } from '@angular/core';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'ng-template[contentTemplate]',
    standalone: false
})
export class StreamWrapperContentDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'ng-template[loaderTemplate]',
    standalone: false
})
export class StreamWrapperLoaderDirective {
    constructor(public template: TemplateRef<any>) {}
}

