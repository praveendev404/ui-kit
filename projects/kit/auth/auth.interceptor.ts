import {
    HTTP_INTERCEPTORS,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParameterCodec,
    HttpParams,
    HttpRequest
} from '@angular/common/http';
import {
    Inject,
    Injectable,
    makeEnvironmentProviders,
    Optional
} from '@angular/core';
import { Observable } from 'rxjs';
import { AUTH_TOKEN_PROVIDER, AuthTokenProvider } from './auth.models';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        @Optional()
        @Inject(AUTH_TOKEN_PROVIDER)
        private tokenProvider: AuthTokenProvider
    ) {}

    private static cloneHeaders(req: HttpRequest<any>): Record<string, string> {
        const httpHeaders: Record<string, string> = {};
        if (req.headers) {
            req.headers.keys().forEach(k => {
                httpHeaders[k] = req.headers.get(k);
            });
        }
        return httpHeaders;
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        if (!this.tokenProvider) {
            console.log('Missing AUTH_TOKEN_PROVIDER');
            return next.handle(req);
        }
        const token = this.tokenProvider.getTokenApi();
        const httpHeaders = AuthInterceptor.cloneHeaders(req);

        httpHeaders.Authorization = 'Bearer ' + token;

        const params = new HttpParams({
            encoder: new CustomEncoder(),
            fromString: req.params.toString()
        });
        // clone the request to add the new header
        const request = req.clone({
            setHeaders: httpHeaders,
            params,
            url: encodeURI(req.url)
        });
        return next.handle(request);
    }
}

class CustomEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}

export function provideAuthInterceptor(authTokenProvider: AuthTokenProvider) {
    return makeEnvironmentProviders([
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: AUTH_TOKEN_PROVIDER,
            useValue: authTokenProvider
        }
    ]);
}
