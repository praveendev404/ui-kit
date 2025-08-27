import { Observable, PartialObserver, Subscription } from 'rxjs';

export function subscriptionWatcher<T>(
    callback: (e: any) => void
): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => {
        return new Observable((observer: PartialObserver<T>): (() => void) => {
            const innerSubscription: Subscription = source.subscribe(observer);
            callback(1);
            return (): void => {
                innerSubscription.unsubscribe();
                callback(-1);
            };
        });
    };
}
