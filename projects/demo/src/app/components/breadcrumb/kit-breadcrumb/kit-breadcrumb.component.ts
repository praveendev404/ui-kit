import { Component } from '@angular/core';
import { BreadcrumbService } from '@dagility-ui/kit';
import { of } from 'rxjs';

@Component({
    selector: 'app-kit-breadcrumb',
    templateUrl: './kit-breadcrumb.component.html',
    viewProviders: [
        {
            provide: BreadcrumbService,
            useFactory: () => ({
                getPrefixes() {
                    return of([
                        {
                            label: 'Organization: Main'
                        }
                    ]);
                },
                getMode() {
                    return undefined;
                }
            })
        }
    ],
    standalone: false
})
export class KitBreadcrumbComponent {
    mode: string = 'pace';

    handleClick() {
        console.log('clicked');
    }
}
