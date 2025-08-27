import {
    AfterViewInit,
    Component,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

import { BaseFormControl } from '../base-form-control';
import PerfectScrollbar from 'perfect-scrollbar';
import { LabelPosition } from '../common.model';

@Directive({
    selector: '[libDropdownHeaderTemplate]',
    standalone: false
})
export class DropdownHeaderTemplateDirective {
    constructor(public template: TemplateRef<any>) { }
}

export type TranslationKeysOfDropdown =
    | 'UNNAMED_GROUP'
    | 'SELECT'
    | 'ALL'
    | 'NONE'
    | 'INVERT'
    | 'SELECTED'
    | 'ADD_ITEM';

export type MultipleHeaderOperationType = 'ALL' | 'NONE' | 'INV';

@Component({
    selector: 'lib-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    host: { class: 'dropdown' },
    standalone: false
})
export class DropdownComponent extends BaseFormControl
    implements OnChanges, AfterViewInit, OnDestroy {
    @Input() width: number;
    @Input() minWidth: number;
    @Input() maxWidth: number;
    @Input() maxLength: number;
    @Input() label: string;
    @Input() labelPosition: LabelPosition = 'top';
    @Input() multiple = false;
    @Input() searchable = true;
    @Input() clearable = true;
    @Input() loading: boolean;
    @Input() placeholder = 'Select Option';
    @Input() notFoundText = 'No items found';
    @Input() typeahead: Subject<string>;
    @Input() appendTo: string = 'body';
    @Input() truncate = true;
    @Input() dropdownPosition = 'auto';

    @Input() id: string = 'select';

    @Input() items: any[] = [];
    @Input() validation: Function;
    @Input() valueKey = 'value';
    @Input() labelKey = 'label';
    @Input() labelRemovable = false;
    @Input() addTag = false;
    @Input() multiline = false;
    @Input() ngSelectItemsFilter = true;
    @Input() showInput = false;
    @Input() addTagFunction: Function;
    @Input() optionTemplateRef: TemplateRef<any>;
    @Input() labelTemplateRef: TemplateRef<any>;
    @Input() addTagTemplateRef: TemplateRef<any>;
    @Input() searchFn: (term: string, item: any) => boolean;
    @Input() editableSearchTerm = false;
    @Input() isItemsLinked = false;
    @Input() clearSearchOnAdd = false;
    @Input() searchTermOnly = false;
    @Input() set setDisable(value: boolean) {
        this.setDisabledState(value);
    }

    @Input() groupBy: string;
    @Input() virtualScroll = false;

    @Input() disableFilterOnSelect = false;

    @Input() totalItemsLength: number;

    /*
     * flag to skip inner setting of dropdown value when clicking on header operation
     */
    @Input() onlyEmitHeaderOperationTypeChange = false;

    @Input() translatedText: Partial<Record<TranslationKeysOfDropdown, string>>;

    get itemsLength() {
        return this.items
            ? this.totalItemsLength
                ? this.totalItemsLength
                : this.items.length
            : 0;
    }

    @Output() valueChange = new EventEmitter<any>();
    @Output() change = new EventEmitter<any>();
    @Output() searchTerm = new EventEmitter<any>();
    @Output() add = new EventEmitter<any>();
    @Output() remove = new EventEmitter<any>();
    @Output() filter = new EventEmitter<string>();
    @Output() scroll = new EventEmitter<any>();
    @Output() close = new EventEmitter<any>();
    @Output() clear = new EventEmitter<any>();
    @Output() navigate = new EventEmitter<number>();
    @Output() multipleHeaderClicked = new EventEmitter<any>();
    @Output() multipleHeaderOperation = new EventEmitter<
        MultipleHeaderOperationType
    >();

    @ViewChild(NgSelectComponent, { read: ElementRef, static: true })
    selectControlEl: ElementRef<HTMLElement>;
    @ViewChild(NgSelectComponent, { static: true }) ngSelect: NgSelectComponent;
    @ViewChild('addTagContainerRef', { read: ViewContainerRef })
    addTagContainerRef: ViewContainerRef;
    @ViewChild('dropdown', { static: true, read: ElementRef })
    dropdownEl: ElementRef;
    @ContentChildren(DropdownHeaderTemplateDirective, { descendants: true })
    headerTemplates: QueryList<DropdownHeaderTemplateDirective>;

    // tslint:disable-next-line:variable-name
    _filterValue: string;
    typeahead$ = new Subject<string>();
    validationError: string;
    height: number;
    afterOnInit = false;
    disabled = false;
    sizeS = false;
    perfectScrollbar: PerfectScrollbar;
    headerTemplate: DropdownHeaderTemplateDirective;
    showCounter: boolean = true;
    min = Math.min;

    addTagFn: Function;

    private changedByUser = false;
    private parentElements: Element[] = [];
    private scrollFn: any;

    ngOnChanges(changes: SimpleChanges) {
        this.perfectScrollbar?.update();
        if (changes.addTag || changes.addTagFunction) {
            this.updateTagFn();
        }
    }

    ngOnInit() {
        super.ngOnInit();
        this.sizeS = this.dropdownEl.nativeElement.parentNode.classList.contains(
            'size-s'
        );
        if (this.isObjectsArray(this.value)) {
            this.value = this.value.map((el: any) => el[this.valueKey]);
        }
        if (this.ngSelectItemsFilter && typeof this.filter === 'function') {
            this.ngSelectItemsFilter = false;
        }

        this.typeahead$
            .pipe(
                debounceTime(500),
                distinctUntilChanged(),
                takeUntil(this.destroy$)
            )
            .subscribe((str: string) => {
                this.filter.emit(str || '');
                this._filterValue = str;
                setTimeout(() => this.perfectScrollbar?.update());
            });

        this.afterOnInit = true;
        this.updateTagFn();
    }

    private updateTagFn() {
        if (this.addTag) {
            this.addTagFn = this.addTagFunction || this.addTagFnImpl;
        } else {
            this.addTagFn = null;
        }
    }

    hoverElementSelectorFn(el: Element) {
        return el.parentElement;
    }

    labelHoverElementSelectorFn(el: Element) {
        return el.parentElement.parentElement.parentElement;
    }

    ngAfterViewInit() {
        this.headerTemplate = this.headerTemplates?.first;
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
        this.ngSelect.classes =
            'dropdown-select ' +
            (this.disabled ? 'dropdown-select--disabled' : '');
        this.showCounter = this.multiple && this.disabled;
        setTimeout(() => {
            this.perfectScrollbar = new PerfectScrollbar(
                this.ngSelect?.dropdownPanel?.contentElementRef.nativeElement.parentNode,
                {
                    wheelPropagation: true
                }
            );
            const ngSelect = this.ngSelect;
            this.addParentsEventListener(ngSelect);
        });
    }

    onSelect(param: any) {
        this.changedByUser = true;
        if (this.ngControl) {
            // Disabling filter is necessary to preserve the previous state in components where filtering uses id
            // but not the items
            const selected =
                this.multiple && !this.disableFilterOnSelect
                    ? this.items?.filter(el =>
                        (param as any[]).includes(el[this.valueKey])
                    )
                    : param;
            this.onChange(selected);
            this.onTouched();
        }
        this.valueChange.emit(param);
    }

    writeValue(value: any) {
        const changed = this.changedByUser || value !== this.value;
        if (this.isObjectsArray(value) && this.afterOnInit) {
            this.value = value.map((el: any) => el[this.valueKey]);
        } else {
            this.value = value;
        }

        if (this.editableSearchTerm && changed) {
            setTimeout(() => {
                this.ngSelect['_setSearchTermFromItems']();
                this.ngSelect['_cd'].markForCheck();
            });
        }
        this.changedByUser = false;
    }

    handleChange(value: any) {
        if (this.truncate) {
            const selectContainer = this.selectControlEl.nativeElement.querySelector<
                HTMLDivElement
            >('.ng-value-container');
            if (selectContainer) {
                setTimeout(() => {
                    if (
                        selectContainer.offsetWidth <
                        selectContainer.scrollWidth
                    ) {
                        selectContainer.title = Array.from(
                            selectContainer.children
                        )
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
        this.change.emit(value);
    }

    handleSearch(value: any) {
        this.searchTerm.emit(this.searchTermOnly ? value.term : value);
        setTimeout(() => this.perfectScrollbar?.update());
    }

    handleNavigate(value: any) {
        this.navigate.emit(value);
    }

    handleAdd(value: any) {
        this.add.emit(value);
    }

    handleRemove(value: any) {
        this.remove.emit(value);
    }

    isObjectsArray(arg: any): arg is Object[] {
        return (
            Array.isArray(arg) &&
            typeof arg[0] === 'object' &&
            [null, undefined].indexOf(arg[0]) < 0
        );
    }

    emitMultipleHeaderClicked(
        newObjects: any,
        operation: MultipleHeaderOperationType
    ) {
        if (this.onlyEmitHeaderOperationTypeChange) {
            this.multipleHeaderOperation.emit(operation);
            return;
        }

        if (this.ngControl) {
            this.ngControl.control.setValue(this.value);
        }

        this.valueChange.emit(this.value);
        this.change.emit(newObjects);
        this.multipleHeaderClicked.emit(newObjects);
        this.multipleHeaderOperation.emit(operation);
    }

    addAll() {
        if (!this.onlyEmitHeaderOperationTypeChange) {
            this.checkItemsWithAddTag();
            this.value = [
                ...this.items.filter(item => !item.disabled).map((obj: any) => {
                    return obj[this.valueKey];
                })
            ];
            this.updateValue();
        }

        this.emitMultipleHeaderClicked(this.items, 'ALL');
    }

    addGroup(group: string) {
        const valuesToAdd = this.items
            .filter(item => item[this.groupBy] === group)
            .map((obj: any) => obj[this.valueKey]);
        this.value = this.items.filter(item => !item.disabled)
            .filter(
                item =>
                    (this.value || []).includes(item[this.valueKey]) ||
                    valuesToAdd.includes(item[this.valueKey])
            )
            .map((obj: any) => obj[this.valueKey]);

        this.updateValue();
    }

    removeGroup(group: string) {
        this.value = (this.value || []).filter(value => {
            const item = this.items.find(elem => elem[this.valueKey] === value);
            return item[this.groupBy] !== group;
        });

        this.updateValue();
    }

    invertAllInGroup(group: string) {
        const allValuesInGroup = this.items
            .filter(item => item[this.groupBy] === group)
            .map((obj: any) => obj[this.valueKey]);
        const selectedValuesInGroup = (this.value || []).filter(value =>
            allValuesInGroup.includes(value)
        );
        const valuesToAdd = allValuesInGroup.filter(
            value => !selectedValuesInGroup.includes(value)
        );

        this.value = this.items
            .filter(item => !item.disabled)
            .filter(item => {
                const value = item[this.valueKey];
                return (
                    valuesToAdd.includes(value) ||
                    ((this.value || []).includes(value) &&
                        !selectedValuesInGroup.includes(value))
                );
            })
            .map((obj: any) => obj[this.valueKey]);
        this.updateValue();
    }

    removeAll() {
        if (!this.onlyEmitHeaderOperationTypeChange) {
            this.checkItemsWithAddTag();
            this.value = [];
            this.updateValue();
        }

        this.emitMultipleHeaderClicked([], 'NONE');
    }

    invertAll() {
        if (this.onlyEmitHeaderOperationTypeChange) {
            this.multipleHeaderOperation.emit('INV');

            return;
        }

        this.checkItemsWithAddTag();
        const invertValue = this.items.filter(
            i => !this.value.includes(i[this.valueKey])
        );

        this.value = [
            ...invertValue.filter(val => !val.disabled).map((obj: any) => {
                return obj[this.valueKey];
            })
        ];
        this.updateValue();
        this.emitMultipleHeaderClicked(invertValue, 'INV');
    }

    checkItemsWithAddTag() {
        if (
            this.addTag &&
            this.items?.length !== this.ngSelect?.itemsList?.items?.length
        ) {
            this.items = this.ngSelect.itemsList.items.map(item => item.value);
        }
    }

    onScroll(): void {
        this.scroll.emit();
    }

    onScrollToEnd(value: any): void {
        this.scroll.emit(value);
    }

    onClose(): void {
        this.showCounter = true;
        this.removeParentsEventListener();
        this.perfectScrollbar?.destroy();
        if (typeof this.validation === 'function') {
            this.validationError = this.validation(this.value);
        }

        if (this._filterValue) {
            this._filterValue = '';
            this.filter.emit(this._filterValue);
        }

        this.close.emit(this.value);
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    addTagFnImpl = (value: string) => {
        let result: any = {};
        result[this.valueKey] = value;
        result[this.labelKey] = value;

        const item = this.items.find(
            el => el[this.valueKey] === result[this.valueKey]
        );
        result = !item ? result : null;
        return result;
    };

    private updateValue() {
        this.ngControl?.control.setValue(this.value);
        this.onChange(this.value);
        this.valueChange.emit(this.value);

        const selectedItems = this.items.filter(item =>
            this.value.includes(item[this.valueKey])
        );
        this.change.emit(selectedItems);
    }

    ngOnDestroy() {
        this.removeParentsEventListener();
    }
}

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[perfect-scrollbar-styles]',
    template: '<ng-content></ng-content>',
    styleUrls: [
        '../../../../../../node_modules/perfect-scrollbar/css/perfect-scrollbar.css'
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class PerfectScrollbarStylesComponent { }
