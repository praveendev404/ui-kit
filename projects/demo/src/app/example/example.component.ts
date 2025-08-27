import { Component } from '@angular/core';
import {
    CustomIcon, facPlusRegular,
    GridColumn,
    HeaderItem,
    ModalService
} from '@dagility-ui/kit';
import { ExampleModalComponent } from './example-modal/example-modal.component';
import { of } from 'rxjs';

const facProjects: CustomIcon = {
    prefix: 'fac',
    iconName: 'facProjects',
    icon: [
        14,
        14,
        [],
        '',
        'M12.25 1.75H1.75001C1.44074 1.75079 1.14437 1.874 0.925689 2.09268C0.707006 2.31136 0.5838 2.60774 0.583008 2.917V11.084C0.584064 11.3931 0.707386 11.6892 0.926041 11.9077C1.1447 12.1261 1.44092 12.2492 1.75001 12.25H12.25C12.5593 12.2492 12.8556 12.126 13.0743 11.9073C13.293 11.6886 13.4162 11.3923 13.417 11.083V2.917C13.4162 2.60774 13.293 2.31136 13.0743 2.09268C12.8556 1.874 12.5593 1.75079 12.25 1.75ZM12.25 11.083H1.75001V2.917H12.25V11.083ZM2.91601 5.833H8.16601V7H2.91601V5.833ZM2.91601 4.083H8.16601V5.25H2.91601V4.083Z'
    ]
};

export const facQuestionInCircle: CustomIcon = {
    prefix: 'fac',
    iconName: 'QuestionInCircle',
    icon: [
        24,
        24,
        [],
        '',
        'M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z M9.08984 8.99959C9.32495 8.33126 9.789 7.7677 10.3998 7.40873C11.0106 7.04975 11.7287 6.91853 12.427 7.0383C13.1253 7.15808 13.7587 7.52112 14.2149 8.06312C14.6712 8.60512 14.9209 9.29112 14.9198 9.99959C14.9198 11.9996 11.9198 12.9996 11.9198 12.9996 M12 17H12.01'
    ],
    customStyles: {
        stroke: 'currentColor',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        fill: 'none'
    }
};

const facHelp: CustomIcon = {
    prefix: 'fac',
    iconName: 'facHelp',
    icon: [
        16,
        16,
        [],
        '',
        'M3.74194 3.76613C4.91935 2.58871 6.33871 2 8 2C9.66129 2 11.0726 2.58871 12.2339 3.76613C13.4113 4.92742 14 6.33871 14 8C14 9.66129 13.4113 11.0806 12.2339 12.2581C11.0726 13.4194 9.66129 14 8 14C6.33871 14 4.91935 13.4194 3.74194 12.2581C2.58065 11.0806 2 9.66129 2 8C2 6.33871 2.58065 4.92742 3.74194 3.76613ZM12.2097 4.90323C11.8871 4.48387 11.5161 4.1129 11.0968 3.79032L9.57258 5.33871C10.0242 5.6129 10.3871 5.97581 10.6613 6.42742L12.2097 4.90323ZM6.35484 9.64516C6.80645 10.0968 7.35484 10.3226 8 10.3226C8.64516 10.3226 9.19355 10.0968 9.64516 9.64516C10.0968 9.19355 10.3226 8.64516 10.3226 8C10.3226 7.35484 10.0968 6.80645 9.64516 6.35484C9.19355 5.90323 8.64516 5.67742 8 5.67742C7.35484 5.67742 6.80645 5.90323 6.35484 6.35484C5.90323 6.80645 5.67742 7.35484 5.67742 8C5.67742 8.64516 5.90323 9.19355 6.35484 9.64516ZM4.90323 3.79032C4.48387 4.1129 4.1129 4.48387 3.79032 4.90323L5.33871 6.42742C5.6129 5.97581 5.97581 5.6129 6.42742 5.33871L4.90323 3.79032ZM3.79032 11.0968C4.1129 11.5161 4.48387 11.8871 4.90323 12.2097L6.42742 10.6613C5.97581 10.3871 5.6129 10.0242 5.33871 9.57258L3.79032 11.0968ZM11.0968 12.2097C11.5161 11.8871 11.8871 11.5161 12.2097 11.0968L10.6613 9.57258C10.3871 10.0242 10.0242 10.3871 9.57258 10.6613L11.0968 12.2097Z'
    ]
};

const CARDS = [
    {
        title: 'Demo 20.01',
        content: 'Demo for jupyter migration'
    },
    {
        title: 'Demo 21.01',
        content: 'Demo for jupyter migration'
    },
    {
        title: 'Demo 22.01',
        content: 'Demo for jupyter migration'
    },
    {
        title: 'Demo 23.01',
        content: 'Demo for jupyter migration'
    },
    {
        title: 'Demo 24.01',
        content: 'Demo for jupyter migration'
    },
    {
        title: 'Demo 25.01',
        content: 'Demo for jupyter migration'
    }
];

const TABLE_DATA = [
    {
        firstName: 'rtest',
        lastName: '5',
        email: 'rtest5@yopmail.com'
    },
    {
        firstName: 'priyanka',
        lastName: 'khot',
        email: 'pkhot@xpanxion.com'
    },
    {
        firstName: 'Sachin',
        lastName: 'Richu',
        email: 'sachin.richu2@ust-global.com'
    },
    {
        firstName: 'Alfred',
        lastName: 'Karayamparambil',
        email: 'alfred.karayamparambil@ust-global.com'
    },
    {
        lastName: 'Sreeji',
        email: 'sreeji.suresh@ust-global.com'
    },
    {
        firstName: 'Kyle',
        lastName: 'Corver',
        email: 'success+kyle458@simulator.amazonses.com'
    },
    {
        firstName: 'Ilya',
        lastName: 'Chernov',
        email: 'ilya.chernov@waveaccess.ru'
    },
    {
        firstName: 'Soorya',
        lastName: 'Mohan',
        email: 'soorya.mmohan@ust-global.com'
    },
    {
        firstName: 'Maksim',
        lastName: 'Parakhin',
        email: 'maksim.parakhin@waveaccess.ru'
    },
    {
        firstName: 'Evgeny',
        lastName: 'Test',
        email: 'eugene@test.com'
    },

    {
        firstName: 'Yogi',
        lastName: 'Mistry',
        email: 'yogi.mistry@ust-global.com'
    },
    {
        firstName: 'Sai',
        lastName: 'Gade',
        email: 'sai.gade@ust-global.com'
    },
    {
        firstName: 'Igor',
        lastName: 'Vlasov',
        email: 'vigorious78@yandex.ru'
    },
    {
        firstName: 'Bindu',
        lastName: 'Rema',
        email: 'bindu.rema@ust-global.com'
    },
    {
        firstName: 'Pradeep',
        lastName: 'Iyer',
        email: 'pradeep.iyer@ust-global.com'
    },
    {
        firstName: 'Shajimon',
        lastName: 'Paremmal',
        email: 'shajimon.paremmal@ust-global.com'
    },
    {
        firstName: 'Vishnu',
        lastName: 'Test',
        email: 'success+vishnu_test@simulator.amazonses.com'
    },
    {
        firstName: 'Oleg',
        lastName: 'Yamanov',
        email: 'oleg.yamanov@waveaccess.ru'
    },
    {
        firstName: 'Neethu',
        lastName: 'Sebastian',
        email: 'neethu.sebastian1@ust-global.com'
    },
    {
        firstName: 'Anju',
        lastName: 'S',
        email: 'anju.satheesh@ust-global.com'
    }
];

@Component({
    selector: 'app-example',
    templateUrl: './example.component.html',
    styleUrls: ['./example.component.scss'],
    standalone: false
})
export class ExampleComponent {
    icons = {
        facPlusRegular: facPlusRegular
    };

    gridColumns: GridColumn[] = [
        { title: 'First name', field: 'firstName', width: '110px' },
        { title: 'Last name', field: 'lastName', width: '110px' },
        { title: 'Email', field: 'email', width: '15%' }
    ];

    topMenuItems: HeaderItem[] = [
        {
            label: 'Projects',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Illuminate',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Monitoring',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Conveyor',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Habitat',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Workspaces',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Settings',
            routerLink: '/components',
            icon: facProjects,
            active$: of(true)
        },
        {
            label: 'Xpresso',
            routerLink: '/',
            icon: facProjects,
            active$: of(true)
        }
    ];

    menuItems = [
        {
            name: 'Option 1',
            routerLink: '/example',
            icon: facHelp
        },
        {
            name: 'Option 2',
            routerLink: '/example',
            icon: facHelp
        },
        {
            name: 'Option 3',
            routerLink: '/example',
            icon: facHelp
        },
        {
            name: 'Option 4',
            routerLink: '/example',
            icon: facHelp
        }
    ];

    isDarkMode: boolean;

    cards: any = CARDS;

    dataSource = TABLE_DATA;
    constructor(private modalService: ModalService) {
        this.isDarkMode = document.documentElement.dataset.theme === 'dark';
    }

    openModal() {
        this.modalService
            .open(ExampleModalComponent, {
                centered: true
            })
            .result.then(() => {})
            .catch(() => {});
    }

    searchCard(str: string) {
        this.cards = CARDS.filter((card: any) =>
            card.title.toLowerCase().includes(str.toLowerCase())
        );
    }
}
