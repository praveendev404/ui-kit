import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-basic',
    templateUrl: './typeahead-basic.component.html',
    standalone: false
})
export class TypeaheadBasicComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
