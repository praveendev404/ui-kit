import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';

import {
    CustomIcon,
    facChevronLeft,
    facChevronRight
} from '@dagility-ui/kit/icons';

export interface TreeLikeMenuGroup {
    label: string;
    items: TreelikeMenuItem[];
}
export interface TreelikeMenuItem {
    label: string;
    icon?: string;
    actionHandler?: (item: TreelikeMenuItem, event?: MouseEvent) => unknown;
    disabled?: boolean;
    hidden?: boolean;
    children?: TreeLikeMenuGroup[];
    template?: TemplateRef<any>;
}

@Component({
    selector: 'lib-treelike-menu',
    templateUrl: './treelike-menu.component.html',
    styleUrls: ['./treelike-menu.component.scss'],
    standalone: false
})
export class TreelikeMenuComponent implements OnChanges, OnDestroy {
    @Input() minWidth: number = 300;
    @Input() maxWidth: number = 300;
    @Input() minHeight: number = 0;
    @Input() maxHeight: number = 340;
    @Input() treeItems: TreeLikeMenuGroup[] = [];
    @Input() openIcon: CustomIcon | string = 'ellipsis';
    @Input() openIconStyles = {};
    @Input() returnIcon: CustomIcon | string = facChevronLeft;
    @Input() nextIcon: CustomIcon | string = facChevronRight;
    @Input() btnClasses: string = 'btn-primary';
    @Input() closeOnClick = false;
    @Input() closeOnScroll: boolean = false;

    @ViewChild(NgbDropdown) dropdown: NgbDropdown;

    currentTreeItems: TreeLikeMenuGroup[] = [];
    isFirstLevel: boolean = true;

    private parentElements: Element[] = [];
    private scrollFn: any;

    readonly itemParentsMap: Map<
        TreeLikeMenuGroup | string,
        TreeLikeMenuGroup[]
    > = new Map<TreeLikeMenuGroup | string, TreeLikeMenuGroup[]>();

    handleItemClick(item: TreelikeMenuItem, event: MouseEvent) {
        if (!item.disabled) {
            if (item.children) {
                this.currentTreeItems = item.children;
                this.isItFirstLevel();
            } else if (item.actionHandler) {
                item.actionHandler(item, event);

                if (this.closeOnClick) {
                    this.dropdown.close();
                }
            }
        }
    }

    handleReturnClick(item: TreeLikeMenuGroup) {
        if (!this.isFirstLevel) {
            this.currentTreeItems = this.itemParentsMap.get(item);
            this.isItFirstLevel();
        }
    }

    resetDropdown(element: Element, dropdown: NgbDropdown) {
        this.currentTreeItems = this.treeItems;
        this.isItFirstLevel();
        if (this.closeOnScroll) {
            dropdown.isOpen()
                ? this.addParentsEventListener(element, dropdown)
                : this.removeParentsEventListener();
        }
    }

    addParentsEventListener(element: Element, dropdown: NgbDropdown) {
        this.scrollFn = () => {
            dropdown.close();
            this.removeParentsEventListener();
        };
        this.parentElements = [];
        let parentElement = element.parentElement;
        do {
            this.parentElements.push(parentElement);
            parentElement.addEventListener('scroll', this.scrollFn);
            parentElement = parentElement.parentElement;
        } while (parentElement);
    }

    removeParentsEventListener() {
        this.parentElements.forEach(element => {
            element.removeEventListener('scroll', this.scrollFn);
        });
    }

    isItFirstLevel() {
        this.isFirstLevel = !this.currentTreeItems.some(group =>
            this.itemParentsMap.get(group)
        );
    }

    private mapItemParent(items: TreeLikeMenuGroup[]) {
        items.forEach(group => {
            group.items.forEach(groupItem => {
                if (groupItem.children) {
                    groupItem.children.forEach(groupItemGroups => {
                        this.itemParentsMap.set(groupItemGroups, items);
                    });
                    this.mapItemParent(groupItem.children);
                }
            });
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.treeItems) {
            this.currentTreeItems = this.treeItems;
            this.mapItemParent(this.treeItems);
        }
    }

    ngOnDestroy() {
        this.removeParentsEventListener();
    }
}
