import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-size-s',
    templateUrl: './dropdown-size-s.component.html',
    standalone: false
})
export class DropdownSizeSComponent {
    items: { label: string, value: any}[] = [
        { label: 'Appleddsfsf d dfsdfdsffdsf dsf', value: 'apple'},
        { label: 'Banana f dsfds fdsfdfddddd dddd dsf df ', value: 'banana'},
        { label: 'Grape', value: 'Grape'},
        { label: 'Orange', value: 'orange'},
        { label: 'Pineapple', value: 'pineapple'},
    ];

    selectedFruit: any = 'apple';
}
