import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbDate, NgbDatepickerI18n } from '@ng-bootstrap/ng-bootstrap';

export enum NavigationEvent {
    PREV,
    NEXT
}

@Component({
    selector: 'lib-datepicker-range-navigation',
    templateUrl: './datepicker-range-navigation.component.html',
    styleUrls: ['./datepicker-range-navigation.component.scss'],
    standalone: false
})
export class DatepickerRangeNavigationComponent {
    navigation = NavigationEvent;

    @Input() date: NgbDate;
    @Input() disabled: boolean;
    @Input() months: any[] = [];
    @Input() showSelect: boolean;
    @Input() prevDisabled: boolean;
    @Input() nextDisabled: boolean;
    @Input() selectBoxes: {years: number[], months: number[]};

    @Output() navigate = new EventEmitter<any>();
    @Output() select = new EventEmitter<NgbDate>();

    constructor(public i18n: NgbDatepickerI18n) {}

    onClickPrev(event: MouseEvent) {
        (event.currentTarget as HTMLElement).focus();
        this.navigate.emit(this.navigation.PREV);
    }

    onClickNext(event: MouseEvent) {
        (event.currentTarget as HTMLElement).focus();
        this.navigate.emit(this.navigation.NEXT);
    }

}
