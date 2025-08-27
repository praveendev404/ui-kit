import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import {
    Spacer,
    SpacersComponent
} from '../../../shared/spacers/spacers.component';

const SPACERS: Spacer[] = [
    {
        groupName: 'Margin-Top',
        values: [
            'mt-2px',
            'mt-5px',
            'mt-8px',
            'mt-10px',
            'mt-15px',
            'mt-16px',
            'mt-20px',
            'mt-25px',
            'mt-30px',
            'mt-40px',
            'mt-50px'
        ],
        bootstrapValues: [
            {
                name: 'mt-0',
                description: 'Margin-Top: 0'
            },
            {
                name: 'mt-1',
                description: 'Margin-Top: .25rem'
            },
            {
                name: 'mt-2',
                description: 'Margin-Top: .5rem'
            },
            {
                name: 'mt-3',
                description: 'Margin-Top: 1rem'
            },
            {
                name: 'mt-4',
                description: 'Margin-Top: 1.5rem'
            },
            {
                name: 'mt-5',
                description: 'Margin-Top: 3rem'
            },
            {
                name: 'mt-auto',
                description: 'Margin-Top: auto'
            }
        ]
    },
    {
        groupName: 'Margin-Right',
        values: [
            'mr-5px',
            'mr-7px',
            'mr-8px',
            'mr-10px',
            'mr-12px',
            'mr-14px',
            'mr-15px',
            'mr-16px',
            'mr-20px',
            'mr-25px',
            'mr-30px',
            'mr-36px'
        ],
        bootstrapValues: [
            {
                name: 'mr-0',
                description: 'Margin-Right: 0'
            },
            {
                name: 'mr-1',
                description: 'Margin-Right: .25rem'
            },
            {
                name: 'mr-2',
                description: 'Margin-Right: .5rem'
            },
            {
                name: 'mr-3',
                description: 'Margin-Right: 1rem'
            },
            {
                name: 'mr-4',
                description: 'Margin-Right: 1.5rem'
            },
            {
                name: 'mr-5',
                description: 'Margin-Right: 3rem'
            },
            {
                name: 'mr-auto',
                description: 'Margin-Right: auto'
            }
        ]
    },
    {
        groupName: 'Margin-Bottom',
        values: [
            'mb-8px',
            'mb-9px',
            'mb-10px',
            'mb-12px',
            'mb-15px',
            'mb-16px',
            'mb-20px',
            'mb-25px',
            'mb-30px',
            'mb-35px'
        ],
        bootstrapValues: [
            {
                name: 'mb-0',
                description: 'Margin-Bottom: 0'
            },
            {
                name: 'mb-1',
                description: 'Margin-Bottom: .25rem'
            },
            {
                name: 'mb-2',
                description: 'Margin-Bottom: .5rem'
            },
            {
                name: 'mb-3',
                description: 'Margin-Bottom: 1rem'
            },
            {
                name: 'mb-4',
                description: 'Margin-Bottom: 1.5rem'
            },
            {
                name: 'mb-5',
                description: 'Margin-Bottom: 3rem'
            },
            {
                name: 'mb-auto',
                description: 'Margin-Bottom: auto'
            }
        ]
    },
    {
        groupName: 'Margin-Left',
        values: [
            'ml-5px',
            'ml-10px',
            'ml-12px',
            'ml-15px',
            'ml-16px',
            'ml-20px',
            'ml-25px',
            'ml-30px'
        ],
        bootstrapValues: [
            {
                name: 'ml-0',
                description: 'Margin-Left: 0'
            },
            {
                name: 'ml-1',
                description: 'Margin-Left: .25rem'
            },
            {
                name: 'ml-2',
                description: 'Margin-Left: .5rem'
            },
            {
                name: 'ml-3',
                description: 'Margin-Left: 1rem'
            },
            {
                name: 'ml-4',
                description: 'Margin-Left: 1.5rem'
            },
            {
                name: 'ml-5',
                description: 'Margin-Left: 3rem'
            },
            {
                name: 'ml-auto',
                description: 'Margin-Left: auto'
            }
        ]
    },
    {
        groupName: 'Margin-Right And Margin-Left',
        values: [
            'mx-8px',
            'mx-16px',
            'mx-25px',
            'mx-30px',
            'mx-36px',
            'mx-40px'
        ],
        bootstrapValues: [
            {
                name: 'mx-0',
                description: 'Margin-Right And Margin-Left: 0'
            },
            {
                name: 'mx-1',
                description: 'Margin-Right And Margin-Left: .25rem'
            },
            {
                name: 'mx-2',
                description: 'Margin-Right And Margin-Left: .5rem'
            },
            {
                name: 'mx-3',
                description: 'Margin-Right And Margin-Left: 1rem'
            },
            {
                name: 'mx-4',
                description: 'Margin-Right And Margin-Left: 1.5rem'
            },
            {
                name: 'mx-5',
                description: 'Margin-Right And Margin-Left: 3rem'
            },
            {
                name: 'mx-auto',
                description: 'Margin-Right And Margin-Left: auto'
            }
        ]
    },
    {
        groupName: 'Margin-Top And Margin-Bottom',
        values: [
            'my-2px',
            'my-5px',
            'my-6px',
            'my-10px',
            'my-12px',
            'my-20px',
            'my-25px',
            'my-30px'
        ],
        bootstrapValues: [
            {
                name: 'my-0',
                description: 'Margin-Top And Margin-Bottom: 0'
            },
            {
                name: 'my-1',
                description: 'Margin-Top And Margin-Bottom: .25rem'
            },
            {
                name: 'my-2',
                description: 'Margin-Top And Margin-Bottom: .5rem'
            },
            {
                name: 'my-3',
                description: 'Margin-Top And Margin-Bottom: 1rem'
            },
            {
                name: 'my-4',
                description: 'Margin-Top And Margin-Bottom: 1.5rem'
            },
            {
                name: 'my-5',
                description: 'Margin-Top And Margin-Bottom: 3rem'
            },
            {
                name: 'my-auto',
                description: 'Margin-Top And Margin-Bottom: auto'
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
export class MarginModule {}
