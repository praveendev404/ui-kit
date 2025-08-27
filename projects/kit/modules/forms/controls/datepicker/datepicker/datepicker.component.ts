import {
    Component,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Injector,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import {
    AbstractControl,
    ControlValueAccessor,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
    NgControl,
    ValidationErrors,
    Validator
} from '@angular/forms';
import {
    NgbCalendar,
    NgbDate,
    NgbDateAdapter,
    NgbDateNativeAdapter,
    NgbDateParserFormatter,
    NgbDatepicker,
    NgbDateStruct,
    NgbPopover,
    NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, fromEvent, noop, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DateTimeModel } from './date-time.model';

const defaultPlaceholder = String('Select Date');

export interface DatePickerRangeModel {
    startDate: Date | null;
    endDate: Date | null;
}

// tslint:disable-next-line:directive-selector
@Directive({
    selector: 'ng-template[dpLeftRangeContent]',
    standalone: false
})
export class DatepickerLeftRangeContentDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

// tslint:disable-next-line:directive-selector
@Directive({
    selector: 'ng-template[dpRightRangeContent]',
    standalone: false
})
export class DatepickerRightRangeContentDirective {
    constructor(public templateRef: TemplateRef<any>) {}
}

@Component({
    selector: 'lib-datepicker',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: DatepickerComponent,
            multi: true
        },
        {
            provide: NgbDateAdapter,
            useClass: NgbDateNativeAdapter
        }
    ],
    host: { class: 'lib-datepicker' },
    standalone: false
})
export class DatepickerComponent
    implements ControlValueAccessor, OnInit, OnChanges, OnDestroy, Validator {
    @ViewChild('dp') dp: ElementRef<NgbDatepicker>;
    @ViewChild('inputEl') inputEl: ElementRef<HTMLInputElement>;
    @ViewChild('popover') popover: NgbPopover;
    @ViewChild('timePickerPopover') timePickerPopover: NgbPopover;
    @ViewChild('datepicker') datepickerElementRef: TemplateRef<HTMLElement>;
    @ViewChild('dateRangePicker') dateRangePickerElementRef: TemplateRef<
        HTMLElement
    >;
    @ViewChild('timepicker') timePickerElementRef: TemplateRef<HTMLElement>;
    @ViewChild('datepickerButton', { static: true })
    datepickerButton: ElementRef<HTMLElement>;
    @Input() id: string;
    @Input() dateString: any;
    @Input() inputDatetimeFormat = 'yyyy-M-d H:mm';
    @Input() hourStep = 1;
    @Input() minuteStep = 5;
    @Input() secondStep = 30;
    @Input() seconds = false;
    @Input() label: string;
    @Input() labelPosition: 'top' | 'left' = 'top';
    @Input() placeholder = defaultPlaceholder;
    @Input() isRequired = false;
    @Input() disabled = false;
    @Input() height = '32px';
    @Input() meridian = false;
    @Input() dateWithTime = false;
    // tslint:disable-next-line:variable-name
    @Input() _disabled = true;
    @Input() container: 'body' | null = 'body';
    @Input() mode: 'single' | 'range' | 'inline-range' | 'inline-single' = 'single';
    @Input() rangeInputFormatter: (
        fromDate: NgbDateStruct,
        toDate: NgbDateStruct
    ) => string;
    @Input() withoutMaxDate = false;

    @Input('ngModel') model: DatePickerRangeModel;

    @ContentChild(DatepickerLeftRangeContentDirective)
    leftRangeContent: DatepickerLeftRangeContentDirective;
    @ContentChild(DatepickerRightRangeContentDirective)
    rightRangeContent: DatepickerRightRangeContentDirective;

    @HostBinding('class') get cssClass() {
        return `d-flex ${
            this.labelPosition === 'left' ? 'flex-row' : 'flex-column'
        } lib-datepicker--${this.labelPosition}`;
    }

    @Output() valueChange = new EventEmitter();

    rangeString: string;
    selectedDaysCount = 0;
    datetime: DateTimeModel = new DateTimeModel();
    private onTouched: () => void = noop;
    private onChange: (_: any) => void = noop;
    private destroy$: Subject<any> = new Subject<any>();
    ngControl: NgControl;

    startDate: any;
    monthName: string;
    pristine = true;

    range = {
        fromDate: null as NgbDateStruct,
        toDate: null as NgbDateStruct,
        hoveredDate: null as any,
        isRange(date: NgbDate) {
            return (
                date.equals(this.fromDate) ||
                (this.toDate && date.equals(this.toDate)) ||
                this.isInside(date) ||
                this.isHovered(date)
            );
        },
        needHover() {
            return this.fromDate && !this.toDate;
        },
        isOutside(date: NgbDate, dp: any) {
            const firstMonth = dp.model.months[0].firstDate.month;
            const month = date.month;
            if (firstMonth === 12) {
                return month > 1 && month < 12;
            }
            return month < firstMonth || month > firstMonth + 1;
        },
        isFrom(date: NgbDate) {
            return date.equals(this.fromDate);
        },
        isTo(date: NgbDate) {
            return this.toDate && date.equals(this.toDate);
        },
        isInside(date: NgbDate) {
            return (
                this.toDate &&
                date.after(this.fromDate) &&
                date.before(this.toDate)
            );
        },
        isHovered(date: NgbDate) {
            return (
                this.fromDate &&
                !this.toDate &&
                this.hoveredDate &&
                date.after(this.fromDate) &&
                date.before(this.hoveredDate)
            );
        },
        onDateSelection(date: NgbDate) {
            if (!this.fromDate && !this.toDate) {
                this.fromDate = date;
            } else if (
                this.fromDate &&
                !this.toDate &&
                date &&
                date.after(this.fromDate)
            ) {
                this.toDate = date;
            } else {
                this.toDate = null;
                this.fromDate = date;
            }
        },
        defaultInputFormatter: (
            fromDate: NgbDateStruct,
            toDate: NgbDateStruct
        ) => {
            const from = fromDate ? this.formatter.format(fromDate) : '';
            const to = toDate ? this.formatter.format(toDate) : '';

            return !from && !to ? '' : `${from} - ${to}`;
        }
    };

    static addBackdrop(isSizeS: boolean) {
        const backdropTarget = document.body;
        if (backdropTarget && backdropTarget.lastChild) {
            const itemToAdd = document.createElement('div');
            itemToAdd.id = 'popover-backdrop';
            itemToAdd.classList.add('overlay-backdrop', 'backdrop-showing');
            backdropTarget.appendChild(itemToAdd);
        }

        const popup: Element = document.body
            .getElementsByClassName('datepicker-popover')
            .item(0);

        if (!popup) {
            return;
        }

        const boundingClientRect = popup.getBoundingClientRect();
        const padding = 8;

        window.innerWidth - boundingClientRect.left <= 250 ||
        window.innerWidth - boundingClientRect.left - padding <=
            boundingClientRect.width
            ? popup.classList.add('small-screen')
            : popup.classList.remove('small-screen');

        isSizeS
            ? popup.classList.add('size-s')
            : popup.classList.remove('size-s');
    }

    static removeBackdrop() {
        const backdrop = document.getElementById('popover-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
    }

    constructor(
        private inj: Injector,
        private elRef: ElementRef,
        private ngbDateAdapter: NgbDateAdapter<Date>,
        public formatter: NgbDateParserFormatter,
        private calendar: NgbCalendar,
        private zone: NgZone
    ) {}

    ngOnInit(): void {
        if (this.mode === 'range' && this.placeholder === defaultPlaceholder) {
            this.placeholder = 'Select a Range';
        }

        this.closeOnEvents(['wheel']);

        setTimeout(() => {
            this.ngControl = this.inj.get(NgControl);

            if (!this.isRequired) {
                this.checkRequired();
            }

            if (this.ngControl && this.ngControl.control) {
                this.ngControl.control.statusChanges
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => this.checkRequired());
            }
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.datepickerButton) {
            const props = ['id'] as const;
            props.forEach(prop => {
                if (changes[prop]) {
                    this.datepickerButton.nativeElement[prop] = this[prop];
                }
            });
        }
    }

    checkRequired() {
        if (this.ngControl && this.ngControl.control) {
            const validator = this.ngControl.control.validator;

            if (validator) {
                const validationErrors = validator({} as AbstractControl);
                this.isRequired = !!(
                    validationErrors && validationErrors.required
                );
            } else {
                this.isRequired = false;
            }
        }
    }

    closeOnEvents(events: string[]) {
        if (events && events.length > 0) {
            this.zone.runOutsideAngular(() => {
                const eventStreams$: Observable<any>[] = [];
                events.forEach(event => {
                    eventStreams$.push(fromEvent(document, event));
                    eventStreams$.push(fromEvent(window, event));
                });
                combineLatest(eventStreams$)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(() => {
                        if (
                            (this.popover && this.popover.isOpen()) ||
                            (this.timePickerPopover &&
                                this.timePickerPopover.isOpen())
                        ) {
                            this.zone.run(() => this.closeDialog());
                        }
                    });
            });
        }
    }

    onPopoverHidden() {
        this.handleToggleBackdrop(false);
    }

    onPopoverShown() {
        this.handleToggleBackdrop(true);
    }

    handleToggleBackdrop(open: boolean) {
        if (open) {
            const isSizeS = this.elRef.nativeElement.classList.contains(
                'size-s'
            );
            DatepickerComponent.addBackdrop(isSizeS);
            if (this.mode === 'single') {
                this.setCurrentDate();
            }
        } else {
            DatepickerComponent.removeBackdrop();
            if (this.mode === 'single') {
                this.startDate = null;
            }
        }
    }

    handleNavigate(event: any) {
        const { month, year } = event.next;
        if (this.datetime.month !== month || this.datetime.year !== year) {
            this.setDayClasses(this.getWeeks(this.getPopup()), false);
            return;
        }
        this.setCurrentDate();
    }

    closeDialog() {
        if (this.popover && this.popover.isOpen()) {
            this.popover.close();
            this.handleToggleBackdrop(false);
        } else if (this.timePickerPopover && this.timePickerPopover.isOpen()) {
            this.timePickerPopover.close();
            this.handleToggleBackdrop(false);
        }
    }

    setDayClasses(weeks: any, add = true) {
        for (let i = 0; i < weeks?.length; i++) {
            const week = weeks.item(i);
            if (week.classList.contains('ngb-dp-weekdays')) {
                continue;
            }
            const days: HTMLCollection = week.children;
            for (let j = 0; j < days.length; j++) {
                const day = days.item(j).children[0];
                if (day.classList.contains('outside')) {
                    continue;
                }
                if (+day.innerHTML === this.datetime.day) {
                    add
                        ? day.classList.add('bg-primary', 'text-white')
                        : day.classList.remove('bg-primary', 'text-white');
                    return;
                }
            }
        }
    }

    getPopup() {
        return document.body
            .getElementsByClassName('datepicker-popover')
            .item(0);
    }

    getWeeks(popup: any) {
        return popup?.getElementsByTagName('ngb-datepicker-month')?.item(0)
            ?.children;
    }

    setCurrentDate() {
        const date = new Date(this.dateString || Date.now());

        this.monthName = date.toLocaleString('en-us', {
            month: 'long'
        });

        this.startDate = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            year: date.getFullYear()
        };

        setTimeout(() => {
            const popup: Element = this.getPopup();
            const ngbDpMonthName = popup?.querySelector('div.ngb-dp-month-name')
                ?.innerHTML;

            if (!ngbDpMonthName) {
                return;
            }

            const yearIndex = ngbDpMonthName.search(/[0-9]+/);
            const month = ngbDpMonthName.substring(1, yearIndex - 1);
            const year = ngbDpMonthName.substring(
                yearIndex,
                ngbDpMonthName.length - 1
            );

            if (+year < this.datetime.year || this.monthName !== month) {
                return;
            }

            const weeks: HTMLCollection = this.getWeeks(popup);

            this.setDayClasses(weeks);
        });
    }

    getTodayNgbDate(): NgbDateStruct {
        const nowDate = new Date();
        return {
            day: nowDate.getDate(),
            month: nowDate.getMonth() + 1,
            year: nowDate.getFullYear()
        };
    }

    onInputChange($event: any) {
        const value = $event.target.value;
        const dt = DateTimeModel.fromLocalString(value);
        this.pristine = false;

        if (dt) {
            this.datetime = dt;
            this.setDateStringModel();
            this._disabled = false;
        } else if (value.trim() === '') {
            this.datetime = new DateTimeModel();
            this.dateString = '';
            this.onChange(this.dateString);
        } else {
            this.onChange(value);
        }
    }

    onDateChange($event: any) {
        if (!$event) {
            return;
        }

        this.pristine = false;

        if (this.mode === 'single') {
            this.setDayClasses(this.getWeeks(this.getPopup()), false);
            const renderDelay = 50;

            setTimeout(() => {
                this.closeDialog();
            }, renderDelay);
        }

        setTimeout(() => {
            if ($event.year) {
                $event = `${$event.year}-${$event.month}-${$event.day}`;
            }

            const date = DateTimeModel.fromLocalString($event);

            if (!date) {
                return;
            }

            if (!this.datetime) {
                this.datetime = date;
            }

            this.datetime.year = date.year;
            this.datetime.month = date.month;
            this.datetime.day = date.day;

            this.valueChange.emit(this.datetime.toString());
            this.setDateStringModel();
            this._disabled = false;
        });
    }

    onTimeChange($event: NgbTimeStruct) {
        this.datetime.hour = $event.hour;
        this.datetime.minute = $event.minute;
        this.datetime.second = $event.second;

        this.valueChange.emit(this.datetime.toString());
        this.setDateStringModel();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    writeValue(newModel: string | DatePickerRangeModel): void {
        if (this.mode === 'range' || this.mode === 'inline-range') {
            newModel = newModel as DatePickerRangeModel;
            this.range.fromDate = newModel?.startDate
                ? this.ngbDateAdapter.fromModel(new Date(newModel.startDate))
                : null;
            this.range.toDate = newModel?.endDate
                ? this.ngbDateAdapter.fromModel(new Date(newModel.endDate))
                : null;
            this.updateRangeStr();
            return;
        }
        if (newModel) {
            this.datetime = Object.assign(
                this.datetime,
                DateTimeModel.fromLocalString(newModel as string)
            );
            this.dateString = newModel;
            this.setDateStringModel();
            if (this.mode === 'inline-single') {
                this.setCurrentDate();
            }
        } else {
            this.datetime = new DateTimeModel();
        }
    }

    setDateStringModel() {
        this.dateString = this.datetime.toString();
        this.onChange(this.dateString);
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    handleDateRangeSelect(event: NgbDate) {
        this.range.onDateSelection(event);
        this.updateRange();
        this.updateRangeStr();

        if (!this.range.fromDate || !this.range.toDate) {
            return;
        }

        const renderDelay = 50;

        setTimeout(() => {
            this.closeDialog();
        }, renderDelay);
    }

    updateRange() {
        const { fromDate, toDate } = this.range;
        this.onChange({
            startDate: fromDate ? this.ngbDateAdapter.toModel(fromDate) : null,
            endDate: toDate ? this.ngbDateAdapter.toModel(toDate) : null
        });
    }

    validate(control: AbstractControl): ValidationErrors | null {
        if (this.mode === 'single' || this.mode === 'inline-single') {
            return null;
        }

        const value = control.value;
        return !value ||
            (!value.startDate &&
                !value.endDate &&
                !this.inputEl.nativeElement.value) ||
            (value.startDate &&
                value.endDate &&
                value.startDate < value.endDate)
            ? null
            : {
                  range: true
              };
    }

    inputRangeChanged(input: string) {
        const parts = (input || '').split(' - ');
        if (parts.length !== 2) {
            this.range.fromDate = this.range.toDate = null;
        } else {
            const [fromDateStr, toDateStr] = parts;
            this.range.fromDate = this.convertToNgbDate(fromDateStr);
            this.range.toDate = this.convertToNgbDate(toDateStr);
        }
        this.updateRange();
    }

    convertToNgbDate(date: any) {
        const parsed = this.formatter.parse(date);
        return parsed && this.calendar.isValid(NgbDate.from(parsed))
            ? NgbDate.from(parsed)
            : null;
    }

    updateRangeStr() {
        const { fromDate, toDate } = this.range;

        this.selectedDaysCount =
            fromDate && toDate
                ? diffNgbDateStruct(fromDate, toDate)
                : fromDate
                ? 1
                : 0;

        const formatter =
            this.rangeInputFormatter || this.range.defaultInputFormatter;
        this.rangeString = formatter(fromDate, toDate);
    }

    clearRange() {
        this.dateString = '';
        if (this.mode === 'range' || this.mode === 'inline-range') {
            this.rangeString = '';
            this.inputRangeChanged('');
        } else {
            this.onChange(this.dateString);
        }
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.handleToggleBackdrop(false);
    }
}

function diffNgbDateStruct(from: NgbDateStruct, to: NgbDateStruct) {
    const fromDate = new Date(from.year, from.month - 1, from.day);
    const toDate = new Date(to.year, to.month - 1, to.day);
    return (
        Math.round(
            (toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1
    );
}
