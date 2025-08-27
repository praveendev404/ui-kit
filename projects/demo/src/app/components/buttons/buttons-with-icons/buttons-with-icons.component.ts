import { Component } from '@angular/core';
import { facCog } from '@dagility-ui/kit';

const BUTTON_ACTIONS = [
    { label: 'Action 1', action: 'action1' },
    { label: 'Action 2', action: 'action2' }
];

@Component({
    selector: 'app-buttons-with-icons',
    templateUrl: './buttons-with-icons.component.html',
    standalone: false
})
export class ButtonsWithIconsComponent {
    buttonActions = BUTTON_ACTIONS;
    cogIcon = facCog;
}
