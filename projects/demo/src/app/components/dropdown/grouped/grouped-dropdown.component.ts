import { Component } from '@angular/core';

@Component({
    selector: 'app-grouped-dropdown',
    templateUrl: './grouped-dropdown.component.html',
    standalone: false
})
export class GroupedDropdownComponent {
    items: { label: string; value: any; group: string; disabled?: boolean }[] = [
        { label: 'Apple', value: 'apple', group: 'fruit' },
        { label: 'Banana', value: 'banana', group: 'fruit' },
        { label: 'Orange', value: 'orange', group: 'fruit' },
        { label: 'Tomato', value: 'tomato', group: 'vegetable' },
        { label: 'Cucumber', value: 'cucumber', group: 'vegetable' },
    ];

    selected: any = ['banana'];

    itemsWithDisableState: { label: string; value: any; group: string; disabled?: boolean }[] = [
        { label: 'Apple', value: 'apple', group: 'fruit', disabled: true },
        { label: 'Banana', value: 'banana', group: 'fruit' },
        { label: 'Orange', value: 'orange', group: 'fruit' },
        { label: 'Tomato', value: 'tomato', group: 'vegetable' },
        { label: 'Cucumber', value: 'cucumber', group: 'vegetable' },
    ];

    selected1: any = ['tomato'];
    
}

