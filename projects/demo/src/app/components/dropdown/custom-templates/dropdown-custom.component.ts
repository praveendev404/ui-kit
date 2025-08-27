import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-custom',
    templateUrl: './dropdown-custom.component.html',
    standalone: false
})
export class DropdownCustomComponent {
    items: { label: string; value: any }[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Grape', value: 'Grape' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pineapple', value: 'pineapple' }
    ];

    selectedFruit: any = 'apple';
}
