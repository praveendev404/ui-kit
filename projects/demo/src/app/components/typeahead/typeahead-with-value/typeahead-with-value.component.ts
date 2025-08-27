import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-with-value',
    templateUrl: './typeahead-with-value.component.html',
    standalone: false
})
export class TypeaheadWithValueComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
