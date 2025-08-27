import { RbacAction } from '../rights.model';

export interface GridColumn {
    title: string;
    field?: string;
    sortingField?: string;
    width?: any;
    hidden?: boolean;
    rights?: RbacAction[];
    sortAsc?: boolean;
    minWidth?: string;
    contextHelp?: string;
}








