export const SIDE_MENU_ITEMS = [
    {
        title: 'Menu 1',
        routerLink: '/components/menu',
        opened: true,
        children: [{ title: 'Child 1', routerLink: '/components/menu' }]
    },
    {
        title: 'Menu 2',
        routerLink: '/components/menu',
        children: [
            { title: 'Child 1', routerLink: '/components/menu' },
            { title: 'Child 2', routerLink: '/components/menu' }
        ]
    }
];
