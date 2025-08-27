import { Component } from '@angular/core';

@Component({
    selector: 'app-dropdown-multiline',
    templateUrl: './dropdown-multiline.component.html',
    standalone: false
})
export class DropdownMultilineComponent {
    items: { label: string; value: any }[] = [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Grape', value: 'Grape' },
        { label: 'Orange', value: 'orange' },
        { label: 'Pineapple', value: 'pineapple' }
    ];

    selectedFruits: any[] = ['pineapple', 'orange'];
}
