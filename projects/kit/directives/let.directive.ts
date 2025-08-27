import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[libLet]',
    standalone: false
})
export class LetDirective<T> {
    @Input('libLet') context: T;

    constructor(
        viewContainer: ViewContainerRef,
        templateRef: TemplateRef<LetDirectiveContext<T>>
    ) {
        viewContainer.createEmbeddedView(
            templateRef,
            new LetDirectiveContext<T>(this)
        );
    }

    static ngTemplateContextGuard<T>(
        dir: LetDirective<T>,
        ctx: unknown
    ): ctx is LetDirectiveContext<T> {
        return true;
    }
}

export class LetDirectiveContext<T> {
    get $implicit(): T {
        return this.dir.context;
    }

    get libLet(): T {
        return this.dir.context;
    }

    constructor(private readonly dir: LetDirective<T>) {}
}
