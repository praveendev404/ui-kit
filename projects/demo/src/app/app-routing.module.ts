import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'getting-started' },
    {
        path: 'getting-started',
        loadChildren: () =>
            import('./getting-started/getting-started.module').then(
                m => m.GettingStartedModule
            )
    },
    {
        path: 'components',
        loadChildren: () =>
            import('./components/components.module').then(
                m => m.ComponentsModule
            )
    },
    {
        path: 'example',
        loadChildren: () =>
            import('./example/example.module').then(m => m.ExampleModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
    enableTracing: false,
    useHash: true
})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
