import { Observable } from 'rxjs';

export abstract class TopicService {
    abstract listenTopic<T = any>(topic: string, params?: any): Observable<T>;
}