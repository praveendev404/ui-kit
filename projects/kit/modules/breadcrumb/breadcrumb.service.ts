import { forwardRef, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RouterLink } from '@angular/router';

export type BreadcrumbMode = 'arrow' | 'bootstrap' | 'pace';

@Injectable({
    providedIn: 'root',
    useClass: forwardRef(() => BreadcrumbDefaultService)
})
export abstract class BreadcrumbService {
    abstract getPrefixes(): Observable<
        { label: string; link: RouterLink['routerLink'] }[]
    >;

    abstract getMode(): BreadcrumbMode;
}

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbDefaultService extends BreadcrumbService {
    getPrefixes(): Observable<
        { label: string; link: RouterLink['routerLink'] }[]
    > {
        return of([]);
    }

    getMode(): BreadcrumbMode {
        return 'bootstrap';
    }
}
