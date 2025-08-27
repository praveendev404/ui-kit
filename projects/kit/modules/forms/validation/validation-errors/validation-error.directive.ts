import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line
    selector: 'ng-template[valError]',
    standalone: false
})
export class ValidationErrorDirective {
    @Input() valError: string;

    constructor(public templateRef: TemplateRef<any>) {}
}
