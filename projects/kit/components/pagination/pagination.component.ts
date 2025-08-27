import {
    Component,
    EventEmitter,
    Input,
    NgModule,
    OnChanges,
    Output
} from '@angular/core';
import { IconsModule } from '@dagility-ui/kit/icons';
import { CommonModule } from '@angular/common';
import { NgbModule, Placement } from '@ng-bootstrap/ng-bootstrap';

import { LibFormsModule } from '../../modules/forms/forms.module';
import { PagerService } from './pager.service';
import { Pager } from '../../models/pagination/pager.model';
import { Pagination } from '../../models/pagination/pagination.model';

type PlacementArray = Placement | Array<Placement> | string;

const ENTER_KEY = 'Enter';

export type TranslationKeysOfPagination =
    | 'SHOW'
    | 'ENTRIES'
    | 'SHOWING'
    | 'TO'
    | 'OF'
    | 'JUMP_TO';

@Component({
    selector: 'lib-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnChanges {
    totalCount = 0;
    pager: Pager;
    perPageCount = 10;
    jumpValue = '';

    private previousPageCount: number;

    get isDiscrete(): boolean {
        return this.pager.pages.length > 5;
    }

    @Input() sortOptions = [10, 25, 50];
    @Input() metaData: Pagination;
    @Input() placement: PlacementArray = ['bottom', 'top'];
    @Input() pageSizeContainer: 'body' | null = null;
    @Input() noDataText: string = 'No data available';
    @Input() translatedText: Partial<
        Record<TranslationKeysOfPagination, string>
    >;
    @Output() pagerdata = new EventEmitter<Pager>();

    constructor(private pagerService: PagerService) {}

    ngOnChanges() {
        this.totalCount = this.metaData.totalElements;
        this.perPageCount = this.metaData.pageSize;
        this.previousPageCount = this.perPageCount;
        this.setInitialPage(this.metaData.page + 1);
    }

    changeMessage(selectedItem: number) {
        this.perPageCount = selectedItem;

        if (this.previousPageCount === this.perPageCount) {
            return;
        }

        this.setPage(0);
    }

    setInitialPage(page: number) {
        this.pager = this.getPager(page);
    }

    setPage(page: number) {
        const pager = this.getPager(page);
        this.pagerdata.emit(pager);
        this.setInitialPage(page);
    }

    getPager(page: number) {
        return this.pagerService.getPager(
            this.totalCount,
            page,
            this.perPageCount
        );
    }

    getVisiblePages(): number[] {
        const pages: number[] = [];
        const first =
            this.pager.currentPage < 3 ? 1 : this.pager.currentPage - 1;
        const last =
            first + 4 < this.pager.totalPages
                ? first + 4
                : this.pager.totalPages;

        for (let i = last - 4; i < last; i++) {
            pages.push(i);
        }

        return pages;
    }

    isEndOfList(): boolean {
        return this.pager.totalPages < this.pager.currentPage + 4;
    }

    jump(): void {
        if (!this.jumpValue) {
            return;
        }

        const val = parseInt(this.jumpValue, 10);
        const page = val > 0 && val <= this.pager.totalPages ? val : 1;

        this.setPage(page);
        this.jumpValue = '';
    }

    onJumpValueChange(e: any): void {
        if (e.key === ENTER_KEY) {
            this.jump();
        } else {
            this.jumpValue = e.target.value;
        }
    }

    validateJumpValue(e: any): boolean {
        return e.charCode >= 48;
    }
}

@NgModule({
    imports: [CommonModule, IconsModule, NgbModule, LibFormsModule],
    declarations: [PaginationComponent],
    exports: [PaginationComponent]
})
export class KitPaginationModule {}
