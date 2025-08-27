import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'lib-datepicker-multi-month-view',
    templateUrl: './datepicker-multi-month-view.component.html',
    styleUrls: ['./datepicker-multi-month-view.component.scss'],
    providers: [DatePipe],
    standalone: false
})
export class DatepickerMultiMonthViewComponent implements OnInit {
    @Input() inputDate: Date;
    @Output() selectDate: EventEmitter<Date> = new EventEmitter<Date>();

    currentDate: Date;
    chunkMonths: any[];
    years: Date[];
    chunkYears: any[];
    rowCount: number = 3;
    yearsMode: boolean = false;

    constructor(private datePipe: DatePipe) {}

    ngOnInit() {
        this.currentDate = this.inputDate;
        this.chunkMonths = this.getChunks(
            this.getMonths(this.currentDate),
            12 / this.rowCount
        );
        this.years = this.getYears(new Date(2010, 1, 1, 0, 0, 0, 0));
        this.chunkYears = this.getChunks(this.years, 12 / this.rowCount);
    }

    getMonths(date: Date) {
        if (!date) {
            return;
        }
        const months: Date[] = [];
        for (let i = 0; i < 12; i++) {
            const month = new Date(date.getFullYear(), i, 1, 0, 0, 0, 0);
            months.push(month);
        }
        return months;
    }

    getYears(date: Date) {
        const years: Date[] = [];
        for (let i = 0; i < 12; i++) {
            const year = new Date(
                date.getFullYear() + i,
                date.getMonth(),
                1,
                0,
                0,
                0,
                0
            );
            years.push(year);
        }
        return years;
    }

    transformDate(date: Date, format: string) {
        return this.datePipe.transform(date, format);
    }

    pickMonth(month: Date) {
        this.currentDate.setMonth(month.getMonth());
        this.selectDate.emit(this.currentDate);
    }

    pickYear(year: Date) {
        this.currentDate.setFullYear(year.getFullYear());
        this.yearsMode = false;
    }

    changeYear(date: Date, inc: number) {
        date.setFullYear(date.getFullYear() + inc);
    }

    changeYearsSet(increment: number) {
        this.years = this.getYears(
            new Date(this.years[0].getFullYear() + increment, 1, 1, 0, 0, 0, 0)
        );
        this.chunkYears = this.getChunks(this.years, 12 / this.rowCount);
    }

    getChunks(array: any[], size: number) {
        if (!array?.length) {
            return;
        }
        const results = [];
        const source = [...array];
        while (source.length) {
            results.push(source.splice(0, size));
        }
        return results;
    }

    turnMode() {
        this.yearsMode = !this.yearsMode;
    }
}
