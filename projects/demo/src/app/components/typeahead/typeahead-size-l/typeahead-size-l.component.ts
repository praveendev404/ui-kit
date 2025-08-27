import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-size-l',
    templateUrl: './typeahead-size-l.component.html',
    standalone: false
})
export class TypeaheadSizeLComponent {
    readonly items = ['Apple', 'Banana', 'Grape', 'Orange', 'Pineapple'];
}
