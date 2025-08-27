import { Component, Input, ContentChild } from '@angular/core';

import { Observable, BehaviorSubject, concat, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

import {
    StreamWrapperContentDirective,
    StreamWrapperLoaderDirective
} from './stream-wrapper.directives';

@Component({
    selector: 'lib-stream-wrapper',
    templateUrl: './stream-wrapper.component.html',
    styleUrls: ['./stream-wrapper.component.scss'],
    standalone: false
})
export class StreamWrapperComponent<T> {
    @Input() set dataStream$(obs: Observable<T>) {
        this.obsWithReload$ = this.reload$.asObservable().pipe(
            switchMap(() => {
                return concat(
                    of({ type: 'start' }),
                    obs.pipe(catchError(() => of({ type: 'error' })))
                );
            })
        );
    }

    @Input() cssClass: string = 'd-flex';

    @Input() errorCssClass = '';

    @Input() errorText = 'Something went wrong';

    @ContentChild(StreamWrapperContentDirective)
    content: StreamWrapperContentDirective;

    @ContentChild(StreamWrapperLoaderDirective, { static: false })
    loader: StreamWrapperLoaderDirective;

    obsWithReload$: Observable<any>;

    reload$ = new BehaviorSubject(null);

    isBoolean(item: any): item is boolean {
        return typeof item === 'boolean';
    }

    handleReload() {
        this.reload$.next(null);
    }
}
