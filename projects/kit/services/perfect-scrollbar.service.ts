import { ComponentFactoryResolver, ComponentRef, Injectable, Injector } from '@angular/core';
import { PerfectScrollbarComponent } from 'perfect-scrollbar-angular';

@Injectable({
    providedIn: 'root',
})
export class PerfectScrollbarService {
    constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {}

    wrap(element: HTMLElement): ComponentRef<PerfectScrollbarComponent> {
        const factory = this.resolver.resolveComponentFactory(PerfectScrollbarComponent);
        return factory.create(this.injector, [[element]]);
    }
}
