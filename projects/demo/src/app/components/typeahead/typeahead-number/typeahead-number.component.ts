import { Component } from '@angular/core';

@Component({
    selector: 'app-typeahead-number',
    templateUrl: './typeahead-number.component.html',
    standalone: false
})
export class TypeaheadNumberComponent {
    readonly items = ['111', '222', '333', '444', '555'];
}
