import { Component } from '@angular/core';

@Component({
    selector: 'app-switch',
    templateUrl: './switch.component.html',
    standalone: false
})
export class SwitchComponent {
    switchViewSelector = 1;

    changeSwitchView(value: number) {
        this.switchViewSelector = value;
    }
}
