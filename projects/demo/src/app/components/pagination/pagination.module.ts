import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { PaginationBasicComponent } from './pagination-basic/pagination-basic.component';

const DEMOS: Record<string, any> = {
    'pagination-basic': {
        title: 'Pagination',
        code: 'pagination/pagination-basic/pagination-basic.component.ts',
        markup: 'pagination/pagination-basic/pagination-basic.component.html',
        type: PaginationBasicComponent
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
    declarations: [PaginationBasicComponent]
})
export class PaginationModule {}
