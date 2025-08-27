import { Observable, of, Subject } from 'rxjs';
import { catchError, concatMap, delay, startWith, tap, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { TopicService } from './topic.service';
import { EnvironmentModel } from '../models/common.model';

@Injectable({ providedIn: 'root' })
export class HttpListenerService extends TopicService {
    constructor(private http: HttpClient, @Inject('environment') private environment: EnvironmentModel) {
        super();
    }

    subject = new Subject();

    listenTopic<T = any>(topic: string, params?: any): Observable<T> {
        return this.subject.pipe(
            delay(2000),
            startWith(0),
            concatMap(() => {
                const full = params.full;

                return this.http
                    .get<any>(`${this.environment.dpApiURL}/data-processor/state`, { params: this.plainObjectToHttpParams(params || {}) })
                    .pipe(
                        catchError(() => of({ jobDefinitions: [] })),
                        map(state => [full, state] as any)
                    );
            }),
            tap(() => this.subject.next())
        );
    }

    private plainObjectToHttpParams(obj: any): HttpParams {
        return Object.keys(obj).reduce((params, key) => params.append(key, obj[key]), new HttpParams());
    }
}

//remove
