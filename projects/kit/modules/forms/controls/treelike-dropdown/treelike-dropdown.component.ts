import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { BaseFormControl } from '../base-form-control';
import { LabelPosition } from '../common.model';
import PerfectScrollbar from 'perfect-scrollbar';
import { NgSelectComponent } from '@ng-select/ng-select';
import {
    CustomIcon,
    facChevronLeft,
    facChevronRight
} from '@dagility-ui/kit/icons';

export interface TreelikeDropdownItem {
    label: string;
    value: number | string;
    count?: number;
    icon?: CustomIcon;
    children: TreelikeDropdownItem[];
}

export function searchTreelikeArray(
    treelikeArray: TreelikeDropdownItem[],
    value: number | string
): TreelikeDropdownItem {
    const searchTree = (array: TreelikeDropdownItem[]) => {
        let result = null;
        for (let i = 0; result == null && i < array.length; i++) {
            result = searchNode(array[i]);
        }
        return result;
    };

    const searchNode = (item: TreelikeDropdownItem) => {
        if (item.value === value) {
            return item;
        } else if (item.children?.length) {
            return searchTree(item.children);
        }
        return null;
    };

    return searchTree(treelikeArray);
}

@Component({
    selector: 'lib-treelike-dropdown',
    templateUrl: './treelike-dropdown.component.html',
    styleUrls: ['./treelike-dropdown.component.scss'],
    host: { class: 'treelike-dropdown' },
    standalone: false
})
export class TreelikeDropdownComponent extends BaseFormControl
    implements OnChanges, OnDestroy {
    @Input() width: number;
    @Input() minWidth: number;
    @Input() maxWidth: number;
    @Input() label: string;
    @Input() labelPosition: LabelPosition = 'top';
    @Input() clearable = true;
    @Input() truncate = true;
    @Input() placeholder = 'Select Option';
    @Input() notFoundText = 'No items found';
    @Input() dropdownPosition = 'auto';
    @Input() appendTo: string = 'body';

    @Input() validation: Function;

    @Input() id: string = 'treelike-select';

    @Input() withCount: boolean = false;
    @Input() items: TreelikeDropdownItem[] = [];
    currentItems: TreelikeDropdownItem[] = [];
    readonly itemParentMap: Map<
        number | string,
        TreelikeDropdownItem
    > = new Map<number | string, TreelikeDropdownItem>();
    private readonly itemParentsMap: Map<
        number | string,
        TreelikeDropdownItem[]
    > = new Map<number | string, TreelikeDropdownItem[]>();

    @Input() set setDisable(value: boolean) {
        this.setDisabledState(value);
    }

    @Input() virtualScroll = false;
    @Input() labelRemovable = false;
    @Input() optionTemplateRef: TemplateRef<any>;
    @Input() labelTemplateRef: TemplateRef<any>;

    sizeS = false;
    height: number;
    closeOnSelect = false;
    disabled = false;
    validationError: string;
    perfectScrollbar: PerfectScrollbar;

    @ViewChild(NgSelectComponent, { read: ElementRef, static: true })
    selectControlEl: ElementRef<HTMLElement>;
    @ViewChild('treelikeDropdown', { static: true, read: ElementRef })
    dropdownEl: ElementRef;
    @ViewChild(NgSelectComponent, { static: true }) ngSelect: NgSelectComponent;

    @Output() valueChange = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() scroll = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();
    @Output() navigate = new EventEmitter<number>();

    private parentElements: Element[] = [];
    private scrollFn: any;

    readonly icons = { facChevronLeft, facChevronRight };

    ngOnChanges(changes: SimpleChanges) {
        this.perfectScrollbar?.update();
    }

    ngOnInit() {
        super.ngOnInit();
        this.sizeS = this.dropdownEl.nativeElement.parentNode.classList.contains(
            'size-s'
        );
        this.initItemParents();
        this.currentItems = this.items;
        if (this.ngSelect) {
            this.ngSelect.toggleItem = () => {};
        }
    }

    private initItemParents() {
        this.items.forEach(item => this.mapItemParent(item, this.items));

        console.log(this.itemParentMap);
        console.log(this.itemParentsMap);
    }

    private mapItemParent(
        item: TreelikeDropdownItem,
        parents: TreelikeDropdownItem[]
    ) {
        item.children.forEach(i => {
            this.itemParentMap.set(i.value, item);
            this.itemParentsMap.set(i.value, parents);
            i.icon = this.icons.facChevronLeft;
            this.mapItemParent(i, item.children);
        });
    }

    getOptionLabel(item: TreelikeDropdownItem): string {
        return this.withCount && item.count
            ? `${item.label} (${item.count})`
            : item.label;
    }

    getLabel(value: number | string): string {
        return this.buildLabel(searchTreelikeArray(this.items, value));
    }

    private buildLabel(item: TreelikeDropdownItem): string {
        return this.itemParentMap.get(item?.value)
            ? `${this.buildLabel(this.itemParentMap.get(item?.value))} / ${
                  item.label
              }`
            : item?.label;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    addParentsEventListener(ngSelect: any) {
        this.scrollFn = () => {
            if (ngSelect.isOpen) {
                ngSelect.close();
                this.removeParentsEventListener();
            }
        };
        this.parentElements = [];
        let parentElement = this.dropdownEl.nativeElement.parentElement;
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

    onOpen() {
        this.currentItems = this.items;

        this.ngSelect.classes =
            'treelike-dropdown-select ' +
            (this.disabled ? 'treelike-dropdown-select--disabled' : '');
        setTimeout(() => {
            this.perfectScrollbar = new PerfectScrollbar(
                this.ngSelect?.dropdownPanel?.contentElementRef.nativeElement.parentNode,
                {
                    wheelPropagation: true
                }
            );
            this.addParentsEventListener(this.ngSelect);
        });
    }

    goBackToParens(item: TreelikeDropdownItem) {
        if (this.itemParentsMap.get(item.value)?.length) {
            this.currentItems = this.itemParentsMap.get(item.value);
        }
    }

    handleChange(item: TreelikeDropdownItem) {
        if (item?.children?.length) {
            this.currentItems = item.children;
        } else {
            if (this.truncate) {
                this.handleChangeForTruncate();
            }
            this.value = item?.value || null;
            this.change.emit(item?.value || null);

            this.updateModel(item?.value || null);

            if (this.ngSelect.isOpen) {
                this.ngSelect.close();
            }
        }
    }

    private handleChangeForTruncate() {
        const selectContainer = this.selectControlEl.nativeElement.querySelector<
            HTMLDivElement
        >('.ng-value-container');
        if (selectContainer) {
            setTimeout(() => {
                if (selectContainer.offsetWidth < selectContainer.scrollWidth) {
                    selectContainer.title = Array.from(selectContainer.children)
                        .slice(1)
                        .map(x => x.textContent)
                        .filter(Boolean)
                        .join(', ');
                } else {
                    selectContainer.title = '';
                }
            });
        }
    }

    private updateModel(value: any) {
        if (this.ngControl) {
            this.onChange(value);
            this.onTouched();
        }
        this.valueChange.emit(value);
    }

    handleRemove(value: TreelikeDropdownItem) {
        this.remove.emit(value);
    }

    onScroll(): void {
        this.scroll.emit();
    }

    onClear() {
        this.clear.emit();
    }

    onClose(): void {
        this.removeParentsEventListener();
        this.perfectScrollbar?.destroy();
        if (typeof this.validation === 'function') {
            this.validationError = this.validation(this.value);
        }

        this.close.emit(this.value);
    }

    onScrollToEnd(value: any): void {
        this.scroll.emit(value);
    }

    ngOnDestroy() {
        this.removeParentsEventListener();
    }
    
}
