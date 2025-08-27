import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {MarketplaceTemplateRating, RatingRowItem, TranslationKeysOfRating} from '../rating.model';

const bigStar =
    '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path class="star-border" fill-rule="evenodd" clip-rule="evenodd" d="M18.1803 20.7543C17.7621 21.0582 17.2026 21.0822 16.76 20.815L12.4061 18.1872L8.0521 20.815C7.60979 21.082 7.05065 21.0583 6.63254 20.7548C6.21442 20.4514 6.01854 19.9272 6.13524 19.4239L7.28401 14.4694L3.44304 11.1358C3.05302 10.7973 2.90338 10.2583 3.06307 9.76723C3.22276 9.27612 3.6608 8.92822 4.17531 8.88385L9.24304 8.44686L11.2226 3.78335C11.4242 3.30842 11.8901 3 12.4061 3C12.922 3 13.388 3.30842 13.5896 3.78335L15.5691 8.44686L20.6368 8.88385C21.1515 8.92824 21.5897 9.2764 21.7492 9.76778C21.9088 10.2592 21.7587 10.7983 21.3682 11.1366L17.5211 14.4694L18.6765 19.4222C18.794 19.9256 18.5985 20.4504 18.1803 20.7543Z"/>\n' +
    '<path class="star-fill" fill-rule="evenodd" clip-rule="evenodd" d="M18.1803 20.7543C17.7621 21.0582 17.2026 21.0822 16.76 20.815L12.4061 18.1872L8.0521 20.815C7.60979 21.082 7.05065 21.0583 6.63254 20.7548C6.21442 20.4514 6.01854 19.9272 6.13524 19.4239L7.28401 14.4694L3.44304 11.1358C3.05302 10.7973 2.90338 10.2583 3.06307 9.76723C3.22276 9.27612 3.6608 8.92822 4.17531 8.88385L9.24304 8.44686L11.2226 3.78335C11.4242 3.30842 11.8901 3 12.4061 3C12.922 3 13.388 3.30842 13.5896 3.78335L15.5691 8.44686L20.6368 8.88385C21.1516 8.92824 21.5897 9.2764 21.7492 9.76778C21.9088 10.2592 21.7587 10.7983 21.3682 11.1366L17.5211 14.4694L18.6765 19.4222C18.794 19.9256 18.5985 20.4504 18.1803 20.7543ZM14.6879 9.66135L20.5264 10.1648L16.0927 14.0057L17.4244 19.7143L12.4061 16.6854L7.38772 19.7143L8.71133 14.0057L4.28577 10.1648L10.1243 9.66135L12.4061 4.28571L14.6879 9.66135Z"/>\n' +
    '</svg>';

@Component({
    selector: 'lib-rating-modal',
    templateUrl: './rating-modal.component.html',
    styleUrls: ['./rating-modal.component.scss'],
    standalone: false
})
export class RatingModalComponent implements OnInit {
    @Input() translatedText: Partial<Record<TranslationKeysOfRating, string>>;
    @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

    max = 5;

    templateName: string;

    bigStar = bigStar;

    form: UntypedFormGroup;

    data: MarketplaceTemplateRating;
    ratingRowsTemplate: RatingRowItem[];

    constructor(public modal: NgbActiveModal) {}

    get rating() {
        return (this.form.get('rating') || 0) as UntypedFormControl;
    }

    ngOnInit() {
        this.initForm();
        this.form.patchValue({
            rating: this.data.rating ? this.data.rating : 0
        });
    }

    saveRating() {
        this.ratingChanged.emit(this.rating.value);
        this.modal.close('Rating Changed');
    }

    private initForm(): void {
        this.form = new UntypedFormGroup({
            rating: new UntypedFormControl(null)
        });
    }
}
