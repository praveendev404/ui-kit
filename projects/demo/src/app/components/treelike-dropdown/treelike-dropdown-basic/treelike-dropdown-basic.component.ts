import {Component} from '@angular/core';
import {TreelikeDropdownItem} from '@dagility-ui/kit';
import {puzzleIcon, timeDetails} from '@dagility-ui/kit/icons';

@Component({
    selector: 'app-treelike-dropdown-basic',
    templateUrl: './treelike-dropdown-basic.component.html',
    standalone: false
})
export class TreelikeDropdownBasicComponent {
    readonly items: TreelikeDropdownItem[] = [
        {
            label: '1',
            value: 1,
            icon: puzzleIcon,
            children: [
                {
                    label: '11',
                    value: 11,
                    children: [
                        {
                            label: '111',
                            value: 111,
                            children: [],
                        },
                        {
                            label: '112',
                            value: 112,
                            children: [],
                        }
                    ],
                },
                {
                    label: '12',
                    value: 12,
                    children: [],
                }
            ],
        },
        {
            label: '2',
            value: 2,
            icon: timeDetails,
            children: [],
        }
    ];

    selectedItem: number = 112;

}
