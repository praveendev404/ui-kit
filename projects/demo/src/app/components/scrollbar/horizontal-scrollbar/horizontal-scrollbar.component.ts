import { Component } from '@angular/core';
import { PerfectScrollbarConfig } from 'perfect-scrollbar-angular';

@Component({
    selector: 'app-horizontal-scrollbar',
    templateUrl: './horizontal-scrollbar.component.html',
    styleUrls: ['./horizontal-scrollbar.component.scss'],
    standalone: false
})
export class HorizontalScrollbarComponent {
    perfectScrollBarConfig: PerfectScrollbarConfig = new PerfectScrollbarConfig(
        {
            suppressScrollX: false,
            suppressScrollY: true,
            useBothWheelAxes: true
        }
    );
}
