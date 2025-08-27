import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule, PagerService } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { DataGridBasicComponent } from './data-grid-basic/data-grid-basic.component';
import { DataGridWithPaginationComponent } from './data-grid-with-pagination/data-grid-with-pagination.component';
import { DataGridWithScrollComponent } from './data-grid-with-scroll/data-grid-with-scroll.component';
import { DataGridWithSortComponent } from './data-grid-with-sort/data-grid-with-sort.component';
import { DataGridWithApiComponent } from './data-grid-with-api/data-grid-with-api.component';
import { DataGridWithDragRowsComponent } from './data-grid-with-drag-rows/data-grid-with-drag-rows.component';
import { DataGridService } from './services/data-grid.service';
import { DataGridNoDataComponent } from './data-grid-no-data/data-grid-no-data.component';

const DEMOS: Record<string, any> = {
    'data-grid-basic': {
        title: 'Data Grid',
        code: 'data-grid/data-grid-basic/data-grid-basic.component.ts',
        markup: 'data-grid/data-grid-basic/data-grid-basic.component.html',
        type: DataGridBasicComponent
    },
    'data-grid-with-scroll': {
        title: 'Data Grid With Scroll',
        code: 'data-grid/data-grid-with-scroll/data-grid-with-scroll.component.ts',
        markup: 'data-grid/data-grid-with-scroll/data-grid-with-scroll.component.html',
        type: DataGridWithScrollComponent
    },
    'data-grid-with-sort': {
        title: 'Data Grid With Sort',
        code: 'data-grid/data-grid-with-sort/data-grid-with-sort.component.ts',
        markup: 'data-grid/data-grid-with-sort/data-grid-with-sort.component.html',
        type: DataGridWithSortComponent
    },
    'data-grid-with-drag-rows': {
        title: 'Data Grid With Drag Rows',
        code: 'data-grid/data-grid-with-drag-rows/data-grid-with-drag-rows.component.ts',
        markup: 'data-grid/data-grid-with-drag-rows/data-grid-with-drag-rows.component.html',
        type: DataGridWithDragRowsComponent
    },
    'data-grid-with-pagination': {
        title: 'Data Grid With Pagination',
        code: 'data-grid/data-grid-with-pagination/data-grid-with-pagination.component.ts',
        markup: 'data-grid/data-grid-with-pagination/data-grid-with-pagination.component.html',
        type: DataGridWithPaginationComponent
    },
    'data-grid-with-api': {
        title: 'Data Grid With Api',
        code: 'data-grid/data-grid-with-api/data-grid-with-api.component.ts',
        markup: 'data-grid/data-grid-with-api/data-grid-with-api.component.html',
        type: DataGridWithApiComponent
    },
    'data-grid-no-data': {
        title: 'Data Grid No Data',
        code: 'data-grid/data-grid-no-data/data-grid-no-data.component.ts',
        markup: 'data-grid/data-grid-no-data/data-grid-no-data.component.html',
        type: DataGridNoDataComponent
    }
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS }
            }
        ])
    ],
    declarations: [
        DataGridBasicComponent,
        DataGridWithPaginationComponent,
        DataGridWithScrollComponent,
        DataGridWithSortComponent,
        DataGridWithDragRowsComponent,
        DataGridWithApiComponent,
        DataGridNoDataComponent
    ],
    providers: [PagerService, DataGridService]
})
export class DataGridModule {}
