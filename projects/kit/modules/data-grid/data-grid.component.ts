import {
    AfterViewInit,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    Output,
    ViewChild
} from '@angular/core';

import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { PlacementArray } from '@ng-bootstrap/ng-bootstrap/util/positioning';
import { ScrollDirective } from '../../directives/scroll.directive';
import { GridColumn } from '../../models/data-grid/grid-column';
import { Pagination } from '../../models/pagination/pagination.model';
import { Pageable } from '../../models/pagination/paging.models';
import { Pager } from '../../models/pagination/pager.model';
import { TranslationKeysOfPagination } from '../../components/pagination/pagination.component';
import {
    HeaderTemplateDirective,
    NoDataRowTemplateDirective,
    RowTemplateDirective
} from './data-grid.directives';

@Component({
    selector: 'lib-data-grid',
    templateUrl: './data-grid.component.html',
    styleUrls: ['./data-grid.component.scss'],
    standalone: false
})
export class DataGridComponent<T = any> implements AfterViewInit {
    @Input() dataSource: T[] = [];
    @Input() columns: GridColumn[] = [];
    @Input() pagination: Pagination;
    @Input() pageable: Pageable;
    @Input() bodyHeight: string;
    @Input() sticky: boolean;
    @Input() scrollCallback: Function;
    @Input() wheelUsing: boolean;
    @Input() wheelUpCallback: Function;
    @Input() wheeledDownCallback: Function;
    @Input() checkLog: boolean;
    @Input() trackByFn: any = null;
    @Input() sortOptions = [10, 25, 50];
    @Input() usePerfectScrollbar: boolean;
    @Input() useHeader: boolean = true;
    @Input() adjustHorizontalScroll: boolean = false;
    @Input() pageSizeContainer: 'body' | null = null;
    @Input() allowDraggingRows = false;
    @Input() placement: PlacementArray = ['bottom', 'top'];
    @Input() noDataText: string = 'No data available';
    @Input() translatedText: Partial<
        Record<TranslationKeysOfPagination, string>
    >;

    @Output() sort: EventEmitter<string> = new EventEmitter<string>();
    @Output() pageChange: EventEmitter<Pager> = new EventEmitter<Pager>();
    @Output() rowClick: EventEmitter<T> = new EventEmitter();
    @Output() rowDoubleClick: EventEmitter<T> = new EventEmitter();
    @Output() rowItemDropped = new EventEmitter<CdkDragDrop<T>>();
    @Output() psScrolledDown = new EventEmitter();

    @ViewChild(ScrollDirective) public scroll: ScrollDirective;
    @ViewChild('tableRef') public tableRef: ElementRef<HTMLTableElement>;

    @ContentChild(HeaderTemplateDirective, { static: true })
    headerTemplate: HeaderTemplateDirective;
    @ContentChild(RowTemplateDirective, { static: true })
    rowTemplate: RowTemplateDirective;
    @ContentChild(NoDataRowTemplateDirective, { static: true })
    noDataRow: NoDataRowTemplateDirective;

    constructor(private elRef: ElementRef) {}

    get gridColumns(): GridColumn[] {
        return this.columns.filter(col => !col.hidden);
    }

    ngAfterViewInit(): void {
        /**
         * fix for scroll bar keeps scrolling down exceeding contents length
         * https://github.com/mdbootstrap/perfect-scrollbar/issues/51
        */
        const tbody: HTMLElement = this.elRef.nativeElement.querySelector('.table-wrapper .data-grid tbody');
        if (tbody) {
            (tbody as any)._getBoundingClientRect = tbody.getBoundingClientRect;
            tbody.getBoundingClientRect = () => {
                const original = (tbody as any)._getBoundingClientRect();
                return {
                    ...original,
                    width: Math.floor(original.width),
                    height: Math.floor(original.height),
                };
            };
        }
    }

    changeSort(fieldName: string): void {
        if (!fieldName) {
            return;
        }

        this.sort.emit(fieldName);
    }

    onPageChange(data: Pager): void {
        this.pageChange.emit(data);
    }

    handleRowClick(item: T) {
        this.rowClick.emit(item);
    }

    handleDoubleClick(item: T) {
        this.rowDoubleClick.emit(item);
    }

    trackByItem = (index: number, item: T) => {
        if (this.trackByFn) {
            return this.trackByFn(index, item);
        }

        return item;
    };

    itemGuard(item: T): T {
        return item;
    }

    onResize() {
        this.elRef.nativeElement.classList.add('grid--auto');
        const width = this.elRef.nativeElement.firstElementChild
            .firstElementChild.offsetWidth;
        this.elRef.nativeElement.style.setProperty('--w', `${width}px`);

        const ths = Array.from(
            this.tableRef.nativeElement.tHead.children.item(0).children
        );
        ths.forEach((th: HTMLElement, i) => {
            this.columns[i].width = th.offsetWidth + 'px';
        });
        this.elRef.nativeElement.classList.remove('grid--auto');
    }

    onPsScrollDown($event: CustomEvent) {
        this.psScrolledDown.emit($event);
    }
}
