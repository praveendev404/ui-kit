import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-size-s',
    templateUrl: './typeahead-size-s.component.html',
    standalone: false
})
export class TypeaheadSizeSComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
