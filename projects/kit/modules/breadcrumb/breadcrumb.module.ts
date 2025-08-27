import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    BreadcrumbComponent,
    BreadcrumbItemDirective,
    BreadcrumbLinkDirective
} from './breadcrumb.component';
import { IconsModule } from '@dagility-ui/kit/icons';

@NgModule({
    imports: [CommonModule, RouterModule, IconsModule],
    declarations: [
        BreadcrumbComponent,
        BreadcrumbItemDirective,
        BreadcrumbLinkDirective
    ],
    exports: [
        BreadcrumbComponent,
        BreadcrumbItemDirective,
        BreadcrumbLinkDirective
    ]
})
export class KitBreadcrumbModule {}
