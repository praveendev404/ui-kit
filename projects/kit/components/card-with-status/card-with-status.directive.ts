import { Directive, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[cardExpandedTemplate]',
    inputs: ['isShown', 'expandedLabel'],
    standalone: false
})
export class CardExpandedTemplateDirective {
    public isShown = true;
    public expandedLabel: string;

    constructor(public template: TemplateRef<any>) {}
}
