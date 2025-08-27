import { Injectable, NgZone } from '@angular/core';
import { fromEvent, merge, Observable, of } from 'rxjs';
import { filter, map, mapTo, switchMap, take, tap } from 'rxjs/operators';

import { ZoneFreeOperator } from '../operators/zone-free';

@Injectable()
export class FocusMonitor {
    constructor(private readonly zone: NgZone) {}

    monitor$(target: Element): Observable<boolean> {
        let skipNextFocusOut = false;

        return merge(
            fromEvent(window, 'focusout').pipe(
                filter((event: FocusEvent) => {
                    const actualTarget = this.getActualTarget(event);

                    return (
                        !skipNextFocusOut &&
                        this.contains(target, actualTarget) &&
                        !this.isNativeFocused(actualTarget) &&
                        !this.contains(
                            target,
                            event.relatedTarget as Node | null
                        )
                    );
                }),
                mapTo(false)
            ),
            fromEvent(window, 'focusin').pipe(
                map(event => {
                    return this.contains(target, this.getActualTarget(event));
                })
            ),
            fromEvent(window, 'mousedown').pipe(
                switchMap(event => {
                    const actualTarget = this.getActualTarget(event);
                    const targetInZone = this.contains(target, actualTarget);
                    const activeElement = this.getNativeFocused(document);
                    const focusInZone = this.contains(target, activeElement);

                    if (event.defaultPrevented) {
                        return of(focusInZone || targetInZone);
                    }

                    if (focusInZone) {
                        skipNextFocusOut = true;

                        return fromEvent(window, 'focusout').pipe(
                            take(1),
                            mapTo(targetInZone)
                        );
                    }

                    return of(false);
                })
            )
        )
            .pipe(
                tap(v => {
                    skipNextFocusOut = false;
                })
            )
            .lift(new ZoneFreeOperator<boolean>(this.zone));
    }

    private contains(parent: Node, element: Node): Boolean {
        return Boolean(element) && parent.contains(element);
    }

    private getActualTarget(event: Event): Node {
        return (event as any).composedPath()[0];
    }

    private isNativeFocused(node: Node) {
        return (
            !!node &&
            !!node.ownerDocument &&
            this.getNativeFocused(node.ownerDocument) === node
        );
    }

    private getNativeFocused(documentRef: Document): Element | null {
        if (
            !documentRef.activeElement ||
            !documentRef.activeElement.shadowRoot
        ) {
            return documentRef.activeElement;
        }

        let element = documentRef.activeElement.shadowRoot.activeElement;

        while (element && element.shadowRoot) {
            element = element.shadowRoot.activeElement;
        }

        return element;
    }
}
