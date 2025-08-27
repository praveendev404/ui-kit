import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MarketplaceTemplateRating } from '@dagility-ui/kit';
import { delay } from 'rxjs/operators';

@Component({
    selector: 'app-rating-base',
    templateUrl: './rating-base.component.html',
    standalone: false
})
export class RatingBaseComponent {
    ratingStatistics: Observable<MarketplaceTemplateRating> = of({
        rate1: 1,
        rate2: 2,
        rate3: 3,
        rate4: 4,
        rate5: 5,
        downloads: 10,
        rating: 4.5,
        myRating: 1
    }).pipe(delay(1000));
}
