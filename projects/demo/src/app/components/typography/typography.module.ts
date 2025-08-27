import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { UiKitModule } from '@dagility-ui/kit';

import { ExamplesComponent } from '../../shared/examples/examples.component';
import { LegendComponent } from './legend/legend.component';
import { HeadersComponent } from './headers/headers.component';
import { LabelsAndBadgesComponent } from './labels-and-badges/labels-and-badges.component';
import { LabelsAndBadgesSComponent } from './labels-and-badges-s/labels-and-badges-s.component';
import { BodyComponent } from './body/body.component';
import { LinksComponent } from './links/links.component';
import { TitlesAndInfoComponent } from './titles-and-info/titles-and-info.component';
import { TagsComponent } from './tags/tags.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { NoDataComponent } from './no-data/no-data.component';

const DEMOS: Record<string, any> = {
    'titles-and-info': {
        title: 'Titles And Info',
        code: 'typography/titles-and-info/titles-and-info.component.ts',
        markup: 'typography/titles-and-info/titles-and-info.component.html',
        type: TitlesAndInfoComponent,
    },
    headers: {
        title: 'Headers',
        code: 'typography/headers/headers.component.ts',
        markup: 'typography/headers/headers.component.html',
        type: HeadersComponent,
    },
    body: {
        title: 'Body',
        code: 'typography/body/body.component.ts',
        markup: 'typography/body/body.component.html',
        type: BodyComponent,
    },
    links: {
        title: 'Links',
        code: 'typography/links/links.component.ts',
        markup: 'typography/links/links.component.html',
        type: LinksComponent,
    },
    'labels-and-badges': {
        title: 'Labels & Badges Size M (Default)',
        code: 'typography/labels-and-badges/labels-and-badges.component.ts',
        markup: 'typography/labels-and-badges/labels-and-badges.component.html',
        type: LabelsAndBadgesComponent,
    },
    'labels-and-badges-s': {
        title: 'Labels & Badges Size S',
        code: 'typography/labels-and-badges-s/labels-and-badges-s.component.ts',
        markup:'typography/labels-and-badges-s/labels-and-badges-s.component.html',
        type: LabelsAndBadgesSComponent,
    },
    legend: {
        title: 'Legend',
        code: 'typography/legend/legend.component.ts',
        markup: 'typography/legend/legend.component.html',
        type: LegendComponent,
    },
    tags: {
        title: 'Tags',
        code: 'typography/tags/tags.component.ts',
        markup: 'typography/tags/tags.component.html',
        type: TagsComponent,
    },
    'info-box': {
        title: 'Info Box',
        code: 'typography/info-box/info-box.component.ts',
        markup: 'typography/info-box/info-box.component.html',
        type: InfoBoxComponent,
    },
    'no-data': {
        title: 'No Data',
        code: 'typography/no-data/no-data.component.ts',
        markup: 'typography/no-data/no-data.component.html',
        type: NoDataComponent,
    },
};

@NgModule({
    imports: [
        UiKitModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExamplesComponent,
                data: { demos: DEMOS },
            },
        ]),
    ],
    declarations: [
        LegendComponent,
        HeadersComponent,
        LabelsAndBadgesComponent,
        LabelsAndBadgesSComponent,
        BodyComponent,
        LinksComponent,
        TitlesAndInfoComponent,
        TagsComponent,
        InfoBoxComponent,
        NoDataComponent,
    ],
})
export class TypographyModule {}
