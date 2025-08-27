import { Component } from '@angular/core';
import { PerfectScrollbarConfig } from 'perfect-scrollbar-angular';

@Component({
    selector: 'app-both-side-scrollbar',
    templateUrl: './both-side-scrollbar.component.html',
    styleUrls: ['./both-side-scrollbar.component.scss'],
    standalone: false
})
export class BothSideScrollbarComponent {
    perfectScrollBarConfig: PerfectScrollbarConfig = new PerfectScrollbarConfig(
        {
            suppressScrollX: false,
            suppressScrollY: false,
            useBothWheelAxes: true
        }
    );
}
