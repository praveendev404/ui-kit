import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { SearchBasicComponent } from './search-basic/search-basic.component';
import { SearchWithValueComponent } from './search-with-value/search-with-value.component';
import { SearchSizeSComponent } from './search-size-s/search-size-s.component';
import { SearchSizeLComponent } from './search-size-l/search-size-l.component';

const DEMOS: Record<string, any> = {
    'search-basic': {
        title: 'Search (Size M)',
        code: 'search/search-basic/search-basic.component.ts',
        markup: 'search/search-basic/search-basic.component.html',
        type: SearchBasicComponent
    },
    'search-size-s': {
        title: 'Search Size S',
        code: 'search/search-size-s/search-size-s.component.ts',
        markup: 'search/search-size-s/search-size-s.component.html',
        type: SearchSizeSComponent
    },
    'search-size-l': {
        title: 'Search Size L',
        code: 'search/search-size-l/search-size-l.component.ts',
        markup: 'search/search-size-l/search-size-l.component.html',
        type: SearchSizeLComponent
    },
    'search-with-value': {
        title: 'Search With Value',
        code: 'search/search-with-value/search-with-value.component.ts',
        markup: 'search/search-with-value/search-with-value.component.html',
        type: SearchWithValueComponent
    }
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS }
            }
        ])
    ],
    declarations: [
        SearchBasicComponent,
        SearchWithValueComponent,
        SearchSizeSComponent,
        SearchSizeLComponent
    ]
})
export class SearchModule {}
