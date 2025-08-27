import { Directive, Input, TemplateRef } from '@angular/core';
import { ContextMenuItem } from '../context-menu/context-menu.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'ng-template[navItem]',
    standalone: false
})
export class NavItemDirective {
    hidden: boolean;
    @Input() navItemName: string;
    @Input() navItemId: string;
    @Input() navItemLink: string;
    @Input() navItemHeaderTemplate: TemplateRef<any>;
    @Input() navItemContextMenuItems: ContextMenuItem[];

    props: Record<string, any> = {};

    constructor(public template: TemplateRef<any>) {}
}
