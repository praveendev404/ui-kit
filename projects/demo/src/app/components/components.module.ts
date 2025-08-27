import { NgModule } from '@angular/core';

import { ComponentsComponent } from './components.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagerService } from '@dagility-ui/kit';

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild([
            {
                path: '',
                component: ComponentsComponent,
                children: [
                    { path: '', pathMatch: 'full', redirectTo: 'breadcrumb' },
                    {
                        path: 'buttons',
                        loadChildren: () =>
                            import('./buttons/buttons.module').then(
                                m => m.ButtonsModule
                            )
                    },
                    {
                        path: 'checkbox',
                        loadChildren: () =>
                            import('./checkbox/checkbox.module').then(
                                m => m.CheckboxModule
                            )
                    },
                    {
                        path: 'data-grid',
                        loadChildren: () =>
                            import('./data-grid/data-grid.module').then(
                                m => m.DataGridModule
                            )
                    },
                    {
                        path: 'datepicker',
                        loadChildren: () =>
                            import('./datepicker/datepicker.module').then(
                                m => m.DatepickerModule
                            )
                    },
                    {
                        path: 'dropdown',
                        loadChildren: () =>
                            import('./dropdown/dropdown.module').then(
                                m => m.DropdownModule
                            )
                    },
                    {
                        path: 'treelike-dropdown',
                        loadChildren: () =>
                            import(
                                './treelike-dropdown/treelike-dropdown.module'
                            ).then(m => m.TreelikeDropdownModule)
                    },
                    {
                        path: 'treelike-menu',
                        loadChildren: () =>
                            import('./treelike-menu/treelike-menu.module').then(
                                m => m.TreelikeMenuModule
                            )
                    },
                    {
                        path: 'input',
                        loadChildren: () =>
                            import('./input/input.module').then(
                                m => m.InputModule
                            )
                    },
                    {
                        path: 'popups',
                        loadChildren: () =>
                            import('./popups/popups.module').then(
                                m => m.PopupsModule
                            )
                    },
                    {
                        path: 'rating',
                        loadChildren: () =>
                            import('./rating/rating.module').then(
                                m => m.AppRatingModule
                            )
                    },
                    {
                        path: 'spinner',
                        loadChildren: () =>
                            import('./spinner/spinner.module').then(
                                m => m.SpinnerModule
                            )
                    },
                    {
                        path: 'search',
                        loadChildren: () =>
                            import('./search/search.module').then(
                                m => m.SearchModule
                            )
                    },
                    {
                        path: 'pagination',
                        loadChildren: () =>
                            import('./pagination/pagination.module').then(
                                m => m.PaginationModule
                            )
                    },
                    {
                        path: 'stream-wrapper',
                        loadChildren: () =>
                            import(
                                './stream-wrapper/stream-wrapper.module'
                            ).then(m => m.StreamWrapperModule)
                    },
                    {
                        path: 'navigation',
                        loadChildren: () =>
                            import('./navigation/navigation.module').then(
                                m => m.NavigationModule
                            )
                    },
                    {
                        path: 'sidenav',
                        loadChildren: () =>
                            import('./sidenav/sidenav.module').then(
                                m => m.SidenavModule
                            )
                    },
                    {
                        path: 'scrollbar',
                        loadChildren: () =>
                            import('./scrollbar/scrollbar.module').then(
                                m => m.ScrollbarModule
                            )
                    },
                    {
                        path: 'assist-ai',
                        loadChildren: () =>
                            import('./assist-ai/assist-ai.module').then(
                                m => m.AssistAiModule
                            )
                    },
                    {
                        path: 'typography',
                        loadChildren: () =>
                            import('./typography/typography.module').then(
                                m => m.TypographyModule
                            )
                    },
                    {
                        path: 'typeahead',
                        loadChildren: () =>
                            import('./typeahead/typeahead.module').then(
                                m => m.TypeaheadModule
                            )
                    },
                    {
                        path: 'textarea',
                        loadChildren: () =>
                            import('./textarea/textarea.module').then(
                                m => m.TextareaModule
                            )
                    },
                    {
                        path: 'cards',
                        loadChildren: () =>
                            import('./cards/cards.module').then(
                                m => m.CardsModule
                            )
                    },
                    {
                        path: 'expansion-panel',
                        loadChildren: () =>
                            import(
                                './expansion-panel/expansion-panel.module'
                            ).then(m => m.ExpansionPanelModule)
                    },
                    {
                        path: 'breadcrumb',
                        loadChildren: () =>
                            import('./breadcrumb/breadcrumb.module').then(
                                m => m.BreadcrumbModule
                            )
                    },
                    {
                        path: 'context-menu',
                        loadChildren: () =>
                            import('./context-menu/context-menu.module').then(
                                m => m.ContextMenuModule
                            )
                    },
                    {
                        path: 'menu',
                        loadChildren: () =>
                            import('./menu/menu.module').then(m => m.MenuModule)
                    },
                    {
                        path: 'insight-cards',
                        loadChildren: () =>
                            import('./insight-cards/insight-cards.module').then(
                                m => m.InsightCardsModule
                            )
                    },
                    {
                        path: 'colors',
                        loadChildren: () =>
                            import('./colors/colors.module').then(
                                m => m.ColorsModule
                            )
                    },
                    {
                        path: 'spacers',
                        loadChildren: () =>
                            import('./spacers/spacers.module').then(
                                m => m.SpacersModule
                            )
                    },
                    {
                        path: 'icons',
                        loadChildren: () =>
                            import('./icons/icons.module').then(
                                m => m.IconsModule
                            )
                    }
                ]
            }
        ])
    ],
    declarations: [ComponentsComponent],
    providers: [PagerService]
})
export class ComponentsModule {}
