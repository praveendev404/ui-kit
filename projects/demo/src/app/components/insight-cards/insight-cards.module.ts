import { NgModule } from '@angular/core';
import { UiKitModule } from '@dagility-ui/kit';
import { RouterModule } from '@angular/router';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { BasicCardComponent } from './basic-card/basic-card.component';
import { ProgressChartComponent } from './progress-chart/progress-chart.component';

const DEMOS: Record<string, any> = {
    'basic-cards': {
        title: 'Insight Cards',
        code: 'insight-cards/basic-card/basic-card.component.ts',
        markup: 'insight-cards/basic-card/basic-card.component.html',
        type: BasicCardComponent,
    },
    'progress-charts': {
        title: 'Progress Chart',
        code: 'insight-cards/progress-chart/progress-chart.component.ts',
        markup: 'insight-cards/progress-chart/progress-chart.component.html',
        type: ProgressChartComponent,
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
    declarations: [BasicCardComponent, ProgressChartComponent],
})
export class InsightCardsModule {}
