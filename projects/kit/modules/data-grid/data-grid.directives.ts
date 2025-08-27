import { Directive, TemplateRef } from '@angular/core';
import { GridColumn } from '../../models/data-grid/grid-column';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[rowTemplate]',
    standalone: false
})
export class RowTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[headerTemplate]',
    standalone: false
})
export class HeaderTemplateDirective {
    constructor(public template: TemplateRef<any>) {}
}

export class NoDataRowContext {
    $implicit: GridColumn[];
}

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'ng-template[noDataRow]',
    standalone: false
})
export class NoDataRowTemplateDirective {
    constructor(public template: TemplateRef<NoDataRowContext>) {}
}
