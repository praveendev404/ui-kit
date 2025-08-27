import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    Spacer,
    SpacersComponent
} from '../../../shared/spacers/spacers.component';

const SPACERS: Spacer[] = [
    {
        groupName: 'Padding',
        values: ['p-5px', 'p-10px', 'p-15px', 'p-20px', 'p-25px', 'p-30px'],
        bootstrapValues: [
            {
                name: 'p-0',
                description: 'Padding: 0'
            },
            {
                name: 'p-1',
                description: 'Padding: .25rem'
            },
            {
                name: 'p-2',
                description: 'Padding: .5rem'
            },
            {
                name: 'p-3',
                description: 'Padding: 1rem'
            },
            {
                name: 'p-4',
                description: 'Padding: 1.5rem'
            },
            {
                name: 'p-5',
                description: 'Padding: 3rem'
            },
            {
                name: 'p-auto',
                description: 'Padding: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Top',
        values: [
            'pt-3px',
            'pt-5px',
            'pt-7px',
            'pt-10px',
            'pt-15px',
            'pt-18px',
            'pt-20px',
            'pt-25px',
            'pt-30px',
            'pt-40px',
            'pt-50px',
            'pt-70px'
        ],
        bootstrapValues: [
            {
                name: 'pt-0',
                description: 'Padding-Top: 0'
            },
            {
                name: 'pt-1',
                description: 'Padding-Top: .25rem'
            },
            {
                name: 'pt-2',
                description: 'Padding-Top: .5rem'
            },
            {
                name: 'pt-3',
                description: 'Padding-Top: 1rem'
            },
            {
                name: 'pt-4',
                description: 'Padding-Top: 1.5rem'
            },
            {
                name: 'pt-5',
                description: 'Padding-Top: 3rem'
            },
            {
                name: 'pt-auto',
                description: 'Padding-Top: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Right',
        values: [
            'pr-5px',
            'pr-8px',
            'pr-10px',
            'pr-15px',
            'pr-20px',
            'pr-25px',
            'pr-30px',
            'pr-35px',
            'pr-40px',
            'pr-60px',
            'pr-65px',
            'pr-90px'
        ],
        bootstrapValues: [
            {
                name: 'pr-0',
                description: 'Padding-Right: 0'
            },
            {
                name: 'pr-1',
                description: 'Padding-Right: .25rem'
            },
            {
                name: 'pr-2',
                description: 'Padding-Right: .5rem'
            },
            {
                name: 'pr-3',
                description: 'Padding-Right: 1rem'
            },
            {
                name: 'pr-4',
                description: 'Padding-Right: 1.5rem'
            },
            {
                name: 'pr-5',
                description: 'Padding-Right: 3rem'
            },
            {
                name: 'pr-auto',
                description: 'Padding-Right: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Bottom',
        values: [
            'pb-3px',
            'pb-5px',
            'pb-7px',
            'pb-8px',
            'pb-10px',
            'pb-15px',
            'pb-18px',
            'pb-20px',
            'pb-25px',
            'pb-30px',
            'pb-35px'
        ],
        bootstrapValues: [
            {
                name: 'pb-0',
                description: 'Padding-Bottom: 0'
            },
            {
                name: 'pb-1',
                description: 'Padding-Bottom: .25rem'
            },
            {
                name: 'pb-2',
                description: 'Padding-Bottom: .5rem'
            },
            {
                name: 'pb-3',
                description: 'Padding-Bottom: 1rem'
            },
            {
                name: 'pb-4',
                description: 'Padding-Bottom: 1.5rem'
            },
            {
                name: 'pb-5',
                description: 'Padding-Bottom: 3rem'
            },
            {
                name: 'pb-auto',
                description: 'Padding-Bottom: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Left',
        values: [
            'pl-5px',
            'pl-8px',
            'pl-10px',
            'pl-15px',
            'pl-20px',
            'pl-25px',
            'pl-30px',
            'pl-50px',
            'pl-60px',
            'pl-65px',
            'pl-70px'
        ],
        bootstrapValues: [
            {
                name: 'pl-0',
                description: 'Padding-Left: 0'
            },
            {
                name: 'pl-1',
                description: 'Padding-Left: .25rem'
            },
            {
                name: 'pl-2',
                description: 'Padding-Left: .5rem'
            },
            {
                name: 'pl-3',
                description: 'Padding-Left: 1rem'
            },
            {
                name: 'pl-4',
                description: 'Padding-Left: 1.5rem'
            },
            {
                name: 'pl-5',
                description: 'Padding-Left: 3rem'
            },
            {
                name: 'pl-auto',
                description: 'Padding-Left: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Right And Padding-Left',
        values: [
            'px-10px',
            'px-15px',
            'px-18px',
            'px-20px',
            'px-25px',
            'px-30px'
        ],
        bootstrapValues: [
            {
                name: 'px-0',
                description: 'Padding-Right And Padding-Left: 0'
            },
            {
                name: 'px-1',
                description: 'Padding-Right And Padding-Left: .25rem'
            },
            {
                name: 'px-2',
                description: 'Padding-Right And Padding-Left: .5rem'
            },
            {
                name: 'px-3',
                description: 'Padding-Right And Padding-Left: 1rem'
            },
            {
                name: 'px-4',
                description: 'Padding-Right And Padding-Left: 1.5rem'
            },
            {
                name: 'px-5',
                description: 'Padding-Right And Padding-Left: 3rem'
            },
            {
                name: 'px-auto',
                description: 'Padding-Right And Padding-Left: auto'
            }
        ]
    },
    {
        groupName: 'Padding-Top And Padding-Bottom',
        values: [
            'py-5px',
            'py-10px',
            'py-12px',
            'py-15px',
            'py-20px',
            'py-25px',
            'py-30px'
        ],
        bootstrapValues: [
            {
                name: 'py-0',
                description: 'Padding-Top And Padding-Bottom: 0'
            },
            {
                name: 'py-1',
                description: 'Padding-Top And Padding-Bottom: .25rem'
            },
            {
                name: 'py-2',
                description: 'Padding-Top And Padding-Bottom: .5rem'
            },
            {
                name: 'py-3',
                description: 'Padding-Top And Padding-Bottom: 1rem'
            },
            {
                name: 'py-4',
                description: 'Padding-Top And Padding-Bottom: 1.5rem'
            },
            {
                name: 'py-5',
                description: 'Padding-Top And Padding-Bottom: 3rem'
            },
            {
                name: 'py-auto',
                description: 'Padding-Top And Padding-Bottom: auto'
            }
        ]
    }
];

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: SpacersComponent,
                data: { spacers: SPACERS }
            }
        ])
    ]
})
export class PaddingModule {}
