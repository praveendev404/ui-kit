import { NgModule } from '@angular/core';
import { PerfectScrollbarModule } from 'perfect-scrollbar-angular';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IconsModule } from '@dagility-ui/kit/icons';
import { DataGridComponent } from './data-grid.component';
import {
    HeaderTemplateDirective,
    NoDataRowTemplateDirective,
    RowTemplateDirective
} from './data-grid.directives';
import { ResizeObserverModule } from '../../directives/resize-observer.directive';
import { KitScrollModule } from '../../directives/scroll.directive';
import { KitPaginationModule } from '../../components/pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        ResizeObserverModule,
        PerfectScrollbarModule,
        KitScrollModule,
        IconsModule,
        KitPaginationModule,
        DragDropModule
    ],
    declarations: [
        DataGridComponent,
        RowTemplateDirective,
        HeaderTemplateDirective,
        NoDataRowTemplateDirective
    ],
    exports: [
        DragDropModule,
        DataGridComponent,
        RowTemplateDirective,
        HeaderTemplateDirective,
        NoDataRowTemplateDirective
    ]
})
export class DataGridModule {}
