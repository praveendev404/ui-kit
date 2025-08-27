//#region external modules
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'perfect-scrollbar-angular';

//#region shared app modules
import { LibFormsModule } from './modules/forms/forms.module';
import { SearchModule } from './modules/search/search.module';
import { SidenavModule } from './modules/sidenav/sidenav.module';
import { AccordionStylesModule } from './modules/accordion-styles/accordion-styles.module';
import { CopyToClipboardModule } from './modules/copy-to-clipboard';
import { SpinnerModule } from './components/spinner/spinner.module';
import { DataGridModule } from './modules/data-grid/data-grid.module';
import { ResizeObserverModule } from './directives/resize-observer.directive';

//#region components
import { ModalConfirmComponent } from './components/modals/modal-confirm/modal-confirm.component';
import { ModalWarningComponent } from './components/modals/modal-warning/modal-warning.component';
import { StreamWrapperComponent } from './components/stream-wrapper/stream-wrapper.component';
import { TriggerComponent } from './components/trigger/trigger.component';
import { KitPaginationModule } from './components/pagination/pagination.component';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { ScrollerComponent } from './components/scroller/scroller.component';
import { TagComponent } from './components/tag/tag.component';
import { SortDirective, SortColumnComponent, SortArrByKeyPipe } from './components/sort';
import { InsightCardComponent } from './components/insight-card/insight-card.component';
import { WaitingModalComponent } from './components/waiting-modal/waiting-modal.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { NoDataComponent } from './components/no-data/no-data.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { RadioBlockComponent } from './components/radio-block/radio-block.component';

//#region directives
import { KitScrollModule } from './directives/scroll.directive';
import { StopClickPropagationDirective } from './directives/stop-click-propagation.directive';
import { StreamWrapperContentDirective, StreamWrapperLoaderDirective } from './components/stream-wrapper/stream-wrapper.directives';
import { TooltipWhenOverflowModule } from './directives/tooltip-when-overflow.directive';
import { ResizeDirective } from './directives/resize.directive';
import { NgSelectAdjustPosition } from './directives/ng-select-adjust-position.directive';
import { CardFooterTemplateDirective, CardHeaderTemplateDirective } from './components/card/card.directive';
import { VisibilityDirective } from './directives/visibility.directive';

//#region pipes
import { ObsWithStatusPipe } from './pipes/obs-with-status.pipe';
import { SafeHtmlPipeModule } from './pipes/safe-html.pipe';

//#region global services
// if any of services below is not supposed to be used globally
// then please consider moving this service into dedicated module
import { ModalService } from './services/modal.service';
import { HttpListenerService } from './services/http-listener.service';
import { IfInViewportService } from './services/if-in-viewport.service';
import { PerfectScrollbarService } from './services/perfect-scrollbar.service';
import { UnsavedDataGuard } from './guards/unsaved-data.guard';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SplitButtonComponent } from './components/split-button/split-button.component';
import { NavbarMenuComponent } from './components/navbar-menu/navbar-menu.component';
import { ContextMenuComponent } from './components/context-menu/context-menu.component';
import { ContextButtonDirective, ContextSpecialItemsDirective } from './components/context-menu/context-menu.directive';
import {
    SideMenuChildItemDirective,
    SideMenuFooterDirective,
    SideMenuHeaderDirective,
    SideMenuItemDirective,
} from './components/side-menu/side-menu.directive';
import { NavbarMenuItemAdditionalContentDirective, NavbarMenuSpecialItemsDirective } from './components/navbar-menu/navbar-menu.directive';
import { ButtonWithLoaderComponent } from './components/button-with-loader/button-with-loader.component';
import { HoveredService } from './services/hovered.service';
import { NavComponent } from './components/nav/nav.component';
import { NavItemDirective } from './components/nav/nav.directive';
import { LetDirective } from './directives/let.directive';
import { StopScrollPropagationDirective } from './directives/stop-scroll-propagation.directive';
import { ToastrComponent } from './components/toastr/toastr.component';
import { ToastrBodyTemplateDirective, ToastrFooterTemplateDirective } from './components/toastr/toastr.directive';
import { CardWithStatusComponent } from './components/card-with-status/card-with-status.component';
import { CardExpandedTemplateDirective } from './components/card-with-status/card-with-status.directive';
import { SlideSelectorComponent } from './components/slide-selector/slide-selector.component';
import { ModalWithOptionsComponent } from './components/modals/modal-with-options/modal-with-options.component';
import { KitBreadcrumbModule } from './modules/breadcrumb/breadcrumb.module';
import { WaitingLoaderComponent } from './components/waiting-loader/waiting-loader.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { ThrottledClickDirective } from './directives/throttle-click.directive';
import { ModalHeaderModule } from './components/modals/modal-header/modal-header.module';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { ASSIST_AI_EXPORTS } from './modules/assist-ai/assist-ai.exports';

const modules = [
    CommonModule,
    NgbModule,
    NgSelectModule,
    PerfectScrollbarModule,
    LibFormsModule,
    SearchModule,
    SidenavModule,
    KitBreadcrumbModule,
    AccordionStylesModule,
    SpinnerModule,
    SafeHtmlPipeModule,
    CopyToClipboardModule,
    DataGridModule,
    ResizeObserverModule,
    KitScrollModule,
    KitPaginationModule,
    TooltipWhenOverflowModule,
    ModalHeaderModule,
    ...ASSIST_AI_EXPORTS
];

const components = [
    CardComponent,
    LoaderComponent,
    ModalConfirmComponent,
    ModalWithOptionsComponent,
    ModalWarningComponent,
    NavComponent,
    ScrollerComponent,
    SideMenuComponent,
    SplitButtonComponent,
    StreamWrapperComponent,
    TriggerComponent,
    SideMenuComponent,
    NavbarMenuComponent,
    ContextMenuComponent,
    ButtonWithLoaderComponent,
    ToastrComponent,
    CardWithStatusComponent,
    SlideSelectorComponent,
    TagComponent,
    SortDirective,
    SortColumnComponent,
    WaitingLoaderComponent,
    InsightCardComponent,
    WaitingModalComponent,
    InfoBoxComponent,
    NoDataComponent,
    ProgressBarComponent,
    RadioBlockComponent,
    SidebarComponent
];

const directives = [
    ContextButtonDirective,
    ContextSpecialItemsDirective,
    CardHeaderTemplateDirective,
    SideMenuItemDirective,
    SideMenuChildItemDirective,
    SideMenuHeaderDirective,
    SideMenuFooterDirective,
    CardFooterTemplateDirective,
    StopClickPropagationDirective,
    ThrottledClickDirective,
    StreamWrapperContentDirective,
    StreamWrapperLoaderDirective,
    ResizeDirective,
    NgSelectAdjustPosition,
    NavbarMenuSpecialItemsDirective,
    NavbarMenuItemAdditionalContentDirective,
    NavItemDirective,
    LetDirective,
    StopScrollPropagationDirective,
    ToastrFooterTemplateDirective,
    ToastrBodyTemplateDirective,
    CardExpandedTemplateDirective,
    VisibilityDirective,
];

const pipes = [ObsWithStatusPipe, TruncatePipe, SortArrByKeyPipe];

const providers = [ModalService, HttpListenerService, IfInViewportService, PerfectScrollbarService, UnsavedDataGuard, HoveredService];

@NgModule({
    declarations: [...components, ...pipes, ...directives],
    imports: [...modules, RouterModule],
    exports: [...modules, ...components, ...pipes, ...directives],
    providers: [...providers],
})
export class UiKitModule {}
