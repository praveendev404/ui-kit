import { Component } from '@angular/core';

const ACCORDION_ROWS = [
    { accordionName: 'Panel 1', value: 'Some value' },
    { accordionName: 'Panel 2', value: 'Some value' },
    { accordionName: 'Panel 3', value: 'Some value' }
];

@Component({
    selector: 'app-expansion-panel',
    templateUrl: './expansion-panel.component.html',
    standalone: false
})
export class ExpansionPanelComponent {
    accordionRows: any[] = ACCORDION_ROWS;
}
