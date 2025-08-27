import { RouterModule } from '@angular/router';
import { UiKitModule } from '@dagility-ui/kit';
import { ExamplesComponent } from '../../shared/examples/examples.component';
import { RatingBaseComponent } from './rating-base/rating-base.component';
import { NgModule } from '@angular/core';

const DEMOS: Record<string, any> = {
    'rating-base': {
        title: 'Rating base',
        code: 'rating/rating-base/rating-base.component.ts',
        markup: 'rating/rating-base/rating-base.component.html',
        type: RatingBaseComponent
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
    declarations: [RatingBaseComponent]
})
export class AppRatingModule {}
