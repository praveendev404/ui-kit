import { BehaviorSubject, concat, Observable, of, Subject } from 'rxjs';
import { ActivatedRouteSnapshot } from '@angular/router';
import { catchError, concatMap, delay, startWith, tap } from 'rxjs/operators';

export interface DropdownItem<T = string> {
    label: string;
    value: T;
}

export const toDropDownItem: (item: string) => DropdownItem = item => {
    if (item && item.includes(':')) {
        const pair: string[] = item.split(':');
        return { label: pair[1], value: item };
    }
    return { label: item, value: item };
};

export const toDropDownItemFromIPluginService: (
    item: any
) => DropdownItem = item => ({
    label: item.service,
    value: item.pluginName + ':' + item.service
});

export const capitalizeLabel = (label: string): string => {
    label = label.toLowerCase();
    label = label
        .replace(/\b(\w)/g, s => s.toUpperCase())
        .replace(/_\w/g, s => s.toUpperCase())
        .replace(/_/g, ' ');
    return label;
};

export const toDropDownItemCapitalizedLabel: (
    item: string
) => DropdownItem = item => ({ label: capitalizeLabel(item), value: item });

export function sortArrayByFieldAndDirection(array: any[], field: string, dir: string) {
    return [...array].sort((a, b) => {
        if (dir !== '') {
            if (a[field] === null) {
                return 1;
            }

            if (b[field] === null) {
                return -1;
            }

            if (typeof a[field] === 'string' && typeof b[field] === 'string') {
                if (a[field].localeCompare(b[field], undefined, { sensitivity: 'base' }) > 0) {
                    return dir === 'ASC' ? 1 : -1;
                }
                if (a[field].localeCompare(b[field], undefined, { sensitivity: 'base' }) < 0) {
                    return dir === 'ASC' ? -1 : 1;
                }
            } else {
                if (a[field] > b[field]) {
                    return dir === 'ASC' ? 1 : -1;
                }
                if (a[field] < b[field]) {
                    return dir === 'ASC' ? -1 : 1;
                }
            }
        }

        return 0;
    });
}


export function sortObjectArrayByKey(
    array: any[],
    key: string,
    asc: boolean = true
) {
    array.sort((a, b) => {
        const aKey = a[key];
        const bKey = b[key];
        let result = null;
        if (typeof aKey === 'string' && typeof bKey === 'string') {
            result =
                aKey.toLowerCase() < bKey.toLowerCase()
                    ? asc
                        ? -1
                        : 1
                    : asc
                    ? 1
                    : -1;
        } else {
            result = aKey < bKey ? (asc ? -1 : 1) : asc ? 1 : -1;
        }
        return result;
    });
    return array;
}

export function observeProperty<T, K extends keyof T>(
    target: T,
    key: K
): Observable<T[K]> {
    const subject = new BehaviorSubject<T[K]>(target[key]);

    Object.defineProperty(target, key, {
        get(): T[K] {
            return subject.getValue();
        },
        set(newValue: T[K]): void {
            if (newValue !== subject.getValue()) {
                subject.next(newValue);
            }
        }
    });

    return subject.asObservable();
}

export function writeContents(blob: Blob, fileName: string) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

export function toHttpParams(obj: Record<string, any>): Record<string, string> {
    const returns: Record<string, string> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const v = obj[key];
            if (v) {
                returns[key] = v.toString();
            }
        }
    }
    return returns;
}

export function isDefined<T>(value: T | undefined | null): value is T {
    return value !== undefined && value !== null;
}

export function generateUUID() {
    let d = new Date().getTime();

    if (
        typeof performance !== 'undefined' &&
        typeof performance.now === 'function'
    ) {
        d += performance.now();
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        // tslint:disable-next-line: no-bitwise
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);

        // tslint:disable-next-line: no-bitwise
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
}

export function collectAllParentRouteParams(
    currentSnapshot: ActivatedRouteSnapshot
): Record<string, any> {
    const params: Record<string, any> = {};

    (function mergeParamsFromSnapshot(snapshot: ActivatedRouteSnapshot) {
        Object.assign(params, snapshot.params);

        if (snapshot.parent) {
            mergeParamsFromSnapshot(snapshot.parent);
        }
    })(currentSnapshot);

    return params;
}

export function toJSONBlob<T>(object: T) {
    return new Blob([JSON.stringify(object, undefined, 2)], {
        type: 'application/json'
    });
}

export function loadFile(accept: string) {
    return new Promise<FileList>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = accept;
        input.multiple = false;

        input.onchange = () => resolve(input.files);
        input.onerror = () => reject();

        input.click();
    });
}

export function readFileToObject<T = any>(file: File) {
    return new Promise<T>((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            try {
                const obj = JSON.parse(reader.result as string);
                resolve(obj);
            } catch (e) {
                reject('Invalid data format');
            }
        };

        reader.onerror = () => reject();

        reader.readAsText(file);
    });
}

export function polling<T = any>(
    delayTime: number,
    fn: () => Observable<T>
): Observable<T> {
    const subject$ = new Subject();

    return subject$.pipe(
        delay(delayTime),
        startWith(0),
        concatMap(fn),
        tap(() => subject$.next())
    );
}

export function liftToObsWithStatus<T>(observable: Observable<T>) {
    return concat(
        of({ type: 'start' }),
        observable.pipe(catchError(() => of({ type: 'error' })))
    );
}

export function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
}

export function lightOrDark(color: string) {
    let r, g, b, hsp;
    if (color.match(/^rgb/)) {
        const [R, G, B] = color.match(
            /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
        );

        r = R;
        g = G;
        b = B;
    } else {
        const colorNumber = +(
            '0x' + color.slice(1).replace(color.length < 5 && /./g, '$&$&')
        );

        // tslint:disable-next-line:no-bitwise
        r = colorNumber >> 16;
        // tslint:disable-next-line:no-bitwise
        g = (colorNumber >> 8) & 255;
        // tslint:disable-next-line:no-bitwise
        b = colorNumber & 255;
    }

    hsp = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);

    if (hsp > 127.5) {
        return '#000';
    } else {
        return '#fff';
    }
}

export function focusNativeElement(
    element: HTMLElement,
    focused: boolean = true,
    preventScroll = false
) {
    if (focused) {
        element.focus({ preventScroll });

        return;
    }

    element.blur();
}

export function onVisible(
    element: HTMLElement,
    callback: (elem: HTMLElement) => void
) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        });
    }).observe(element);
}
