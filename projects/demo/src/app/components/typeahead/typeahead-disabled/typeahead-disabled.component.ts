import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-disabled',
    templateUrl: './typeahead-disabled.component.html',
    standalone: false
})
export class TypeaheadDisabledComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
