import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SidenavContainerComponent } from '../sidenav-container/sidenav-container.component';

@Component({
    selector: 'lib-sidenav-content',
    template: '<ng-content></ng-content>',
    styleUrls: ['./sidenav-content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'lib-sidenav-content',
        '[style.margin-left.px]': 'container.leftMargin'
    },
    standalone: false
})
export class SidenavContentComponent {
    constructor(public container: SidenavContainerComponent) {}
}
