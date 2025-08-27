import { Injectable } from '@angular/core';

import sources from '../demos-sources';

@Injectable({
    providedIn: 'root',
})
export class DemoCodeService {
    getDemoSource(fileName?: string): string {
        return fileName ? sources[fileName] || '' : '';
    }
}
