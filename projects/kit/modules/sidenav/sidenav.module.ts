import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

import { IconsModule } from '@dagility-ui/kit/icons';
import { PerfectScrollbarModule } from 'perfect-scrollbar-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SearchModule } from '../search/search.module';
import { TooltipWhenOverflowModule } from '../../directives/tooltip-when-overflow.directive';
import { LibFormsModule } from '../forms/forms.module';
import { SidenavComponent } from './controls/sidenav/sidenav.component';
import {
    SidenavFooterDirective,
    SidenavHeaderDirective,
    SidenavItemPostfixDirective
} from './directives/sidenav.directives';
import { SidenavGroupComponent } from './controls/sidenav-group/sidenav-group.component';
import { SidenavContainerComponent } from './controls/sidenav-container/sidenav-container.component';
import { SidenavContentComponent } from './controls/sidenav-content/sidenav-content.component';

@NgModule({
    declarations: [
        SidenavComponent,
        SidenavHeaderDirective,
        SidenavFooterDirective,
        SidenavItemPostfixDirective,
        SidenavGroupComponent,
        SidenavContainerComponent,
        SidenavContentComponent
    ],
    imports: [
        CommonModule,
        SearchModule,
        RouterModule,
        IconsModule,
        NgbTooltipModule,
        PerfectScrollbarModule,
        TooltipWhenOverflowModule,
        LibFormsModule,
        NgxSkeletonLoaderModule
    ],
    exports: [
        SidenavComponent,
        SidenavContainerComponent,
        SidenavContentComponent,
        SidenavHeaderDirective,
        SidenavFooterDirective,
        SidenavItemPostfixDirective
    ]
})
export class SidenavModule {}
