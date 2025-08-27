import { Component } from '@angular/core';

@Component({
    selector: 'app-readonly-typeahead',
    templateUrl: './readonly-typeahead.component.html',
    standalone: false
})
export class ReadonlyTypeaheadComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
