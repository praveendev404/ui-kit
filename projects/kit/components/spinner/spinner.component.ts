import { Component, NgModule } from '@angular/core';

@Component({
    selector: 'lib-spinner',
    template: `
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
    `,
    styleUrls: ['./spinner.component.scss'],
    host: {
        class: 'd-inline-block'
    },
    standalone: false
})
export class SpinnerComponent {}
