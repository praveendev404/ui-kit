import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { share } from 'rxjs/operators';

export const DEFAULT_INTERSECTION_OBSERVER_OPTIONS: IntersectionObserverInit = {
    threshold: [0, 0.1, 0.9, 1]
};

@Injectable({
    providedIn: 'root'
})
export class IfInViewportService {
    constructor() {}

    isInView(
        elem: HTMLElement,
        options: IntersectionObserverInit = DEFAULT_INTERSECTION_OBSERVER_OPTIONS
    ): Promise<void> {
        return new Promise(resolve => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        resolve();
                        observer.unobserve(elem);
                    }
                });
            }, options);
            observer.observe(elem);
        });
    }

    isInViewObs(
        elem: HTMLElement,
        options = DEFAULT_INTERSECTION_OBSERVER_OPTIONS
    ): Observable<void> {
        return new Observable(subscriber => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        subscriber.next();
                        observer.unobserve(elem);
                    }
                });
            }, options);
            observer.observe(elem);

            return () => observer.unobserve(elem);
        }).pipe(share<void>());
    }
}
