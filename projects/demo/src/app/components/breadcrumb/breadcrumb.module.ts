import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { KitBreadcrumbComponent } from './kit-breadcrumb/kit-breadcrumb.component';

const DEMOS: Record<string, any> = {
    breadcrumb: {
        title: 'Breadcrumb',
        code: 'breadcrumb/breadcrumb/breadcrumb.component.ts',
        markup: 'breadcrumb/breadcrumb/breadcrumb.component.html',
        type: BreadcrumbComponent
    },
    breadcrumbs: {
        title: 'Kit Breadcrumb',
        code: 'breadcrumb/kit-breadcrumb/kit-breadcrumb.component.ts',
        markup: 'breadcrumb/kit-breadcrumb/kit-breadcrumb.component.html',
        type: KitBreadcrumbComponent
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
    declarations: [BreadcrumbComponent, KitBreadcrumbComponent]
})
export class BreadcrumbModule {}
