import {Component} from '@angular/core';

@Component({
    selector: 'app-dropdown-basic',
    templateUrl: './dropdown-basic.component.html',
    standalone: false
})
export class DropdownBasicComponent {
    items: { label: string, value: any, disabled?: boolean;}[] = [
        { label: 'Apple', value: 'apple', disabled: true},
        { label: 'Banana', value: 'banana'},
        { label: 'Grape', value: 'Grape'},
        { label: 'Orange', value: 'orange'},
        { label: 'Pineapple', value: 'pineapple'},
    ];

    selectedFruit: any = 'banana';
}

