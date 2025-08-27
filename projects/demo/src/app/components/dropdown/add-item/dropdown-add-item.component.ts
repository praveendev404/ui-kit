import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-add-item',
    templateUrl: './dropdown-add-item.component.html',
    standalone: false
})
export class DropdownAddItemComponent {
    items: { label: string; value: any }[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Grape', value: 'Grape' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pineapple', value: 'pineapple' }
    ];

    selectedFruits: any = 'pineapple';
}
