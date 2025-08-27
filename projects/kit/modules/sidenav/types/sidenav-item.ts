import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SidenavItemBase {
    id?: string;
    title: string;
    data?: any;
}

export interface SidenavItemFlatGroup extends SidenavItemBase {
    items: ReadonlyArray<SidenavItem | SidenavItemGroup>;
    search: boolean;
    height?: string;
}

export interface SidenavItemGroup extends SidenavItemBase {
    children: ReadonlyArray<SidenavItem | SidenavItemGroup>;
    isCollapsed?: boolean;
}

export interface SidenavItem extends SidenavItemBase {
    routerLink: string;
    icon?: [icon: IconProp | string, size: [width: number, height: number]];
    sidenavParent?: string;
    sidenavParentId?: string;
    withoutRouterLink?: boolean;
}

export type SidenavItems = ReadonlyArray<SidenavItemGroup | SidenavItem | SidenavItemFlatGroup>;
