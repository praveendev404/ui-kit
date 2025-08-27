import {Component, EventEmitter, forwardRef, Input, OnDestroy, Output, Type} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {NgbTooltip, Placement} from '@ng-bootstrap/ng-bootstrap';

import {ModalService} from '../../../../services/modal.service';
import {
    MarketplaceTemplateItem,
    MarketplaceTemplateRating,
    RatingRowItem,
    TranslationKeysOfRating
} from './rating.model';

@Component({
    selector: 'lib-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RatingComponent),
            multi: true
        }
    ],
    standalone: false
})
export class RatingComponent implements ControlValueAccessor, OnDestroy {
    @Output() ratingChanged: EventEmitter<number> = new EventEmitter<number>();

    @Input() value: number;

    @Input() disabled = false;

    @Input() expanded = false;

    @Input() max: number = 5;

    @Input() editable = false;

    @Input() templateData: MarketplaceTemplateItem | any;

    @Input() ratingStatistics: Observable<MarketplaceTemplateRating>;

    @Input() myRate: number;

    @Input() tooltipPlacement: Placement = 'top';

    @Input() translatedText: Partial<Record<TranslationKeysOfRating, string>>;

    defaultRating = {
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate4: 0,
        rate5: 0,
        downloads: 0,
        rating: 0,
        myRating: 0
    };

    ratingRowsTemplate: RatingRowItem[] = [
        { label: '5', width: '60%', height: '4px', value: 0 },
        { label: '4', width: '60%', height: '4px', value: 0 },
        { label: '3', width: '60%', height: '4px', value: 0 },
        { label: '2', width: '60%', height: '4px', value: 0 },
        { label: '1', width: '60%', height: '4px', value: 0 }
    ];

    rating: MarketplaceTemplateRating = null;

    ratingLoaded = false;

    protected destroy$ = new Subject<boolean>();

    onChange = (_: any) => {};

    onTouched = (_: any) => {};

    static ratingModalComponent: Type<any>;

    constructor(private modalService: ModalService,) {}

    ngOnInit() {
        if (this.expanded) {
            this.getDataForTooltip();
        }
    }

    private get numberOfFullStars(): number {
        return Math.floor(this.value);
    }

    private get numberOfEmptyStars(): number {
        return this.max - Math.floor(this.value);
    }

    private get numberOfMyFullStars(): number {
        return Math.floor(this.myRate);
    }

    private get numberOfMyEmptyStars(): number {
        return this.max - Math.floor(this.myRate);
    }

    get fullStars(): any[] {
        return Array(this.numberOfFullStars);
    }

    get emptyStars(): any[] {
        return Array(this.numberOfEmptyStars);
    }

    get myFullStars(): any[] {
        return Array(this.numberOfMyFullStars);
    }

    get myEmptyStars(): any[] {
        return Array(this.numberOfMyEmptyStars);
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    writeValue(value: number): void {
        this.value = value;
    }

    getDataForTooltip() {
        if (!this.ratingLoaded) {
            this.ratingStatistics.pipe(takeUntil(this.destroy$)).subscribe(
                rating => {
                    const ratesCount =
                        rating.ratesCount ||
                        rating.rate1 +
                            rating.rate2 +
                            rating.rate3 +
                            rating.rate4 +
                            rating.rate5;
                    this.rating = Object.assign(rating, {
                        ratesCount: ratesCount ? ratesCount : 0
                    });
                    if (!this.myRate) {
                        this.myRate = this.rating.myRating;
                    }
                    this.ratingRowsTemplate = this.fillRowsTemplate(
                        this.ratingRowsTemplate
                    );
                    this.ratingLoaded = true;
                },
                () => {
                    this.rating = this.defaultRating;
                    this.ratingLoaded = false;
                }
            );
        }
    }

    rate() {
        const modalRef = this.modalService.open(RatingComponent.ratingModalComponent, {
            centered: true,
            backdrop: 'static',
            windowClass: 'rating-modal-container',
        });
        modalRef.componentInstance.translatedText = this.translatedText;
        modalRef.componentInstance.max = this.max;
        modalRef.componentInstance.templateName = this.templateData?.name;
        modalRef.componentInstance.data = this.rating;
        modalRef.componentInstance.ratingRowsTemplate = this.ratingRowsTemplate;
        modalRef.componentInstance.ratingChanged
            .pipe(takeUntil(this.destroy$))
            .subscribe((rate: number) => {
                if (rate) {
                    this.ratingChanged.emit(rate);
                    this.ratingLoaded = false;
                    this.rating = null;
                }
            });
    }

    toggleTooltip(tooltip: NgbTooltip): void {
        if (tooltip.isOpen()) {
            tooltip.close();
        } else {
            this.getDataForTooltip();
            tooltip.open();
        }
    }

    private calculatePercent(prop: string): number {
        if (this.rating) {
            const rate1 = this.rating.rate1 ? this.rating.rate1 : 0;
            const rate2 = this.rating.rate2 ? this.rating.rate2 : 0;
            const rate3 = this.rating.rate3 ? this.rating.rate3 : 0;
            const rate4 = this.rating.rate4 ? this.rating.rate4 : 0;
            const rate5 = this.rating.rate5 ? this.rating.rate5 : 0;
            const sum = rate1 + rate2 + rate3 + rate4 + rate5;
            // @ts-ignore
            return Math.floor((this.rating[prop] / sum) * 100);
        }
        return 0;
    }

    private fillRowsTemplate(rowsTemplate: RatingRowItem[]): RatingRowItem[] {
        return rowsTemplate.map((x, index) => {
            const prop: string = 'rate' + `${5 - index}`;
            const value = this.calculatePercent(prop);
            // @ts-ignore
            return { ...x, value: value };
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
