import {
    Component,
    ElementRef,
    EmbeddedViewRef,
    EventEmitter,
    Input,
    Output,
    HostBinding,
    TemplateRef,
    ViewChild,
    DoCheck
} from '@angular/core';
import {
    NgbDateAdapter,
    NgbDateNativeAdapter,
    NgbDateStruct,
    NgbTimeStruct
} from '@ng-bootstrap/ng-bootstrap';
import { faCalendar, faClock } from '@fortawesome/free-solid-svg-icons';

import { BaseFormControl } from '../../base-form-control';

export type TranslationKeysOfDatepickerAdapter = 'SELECT_TODAY';

@Component({
    selector: 'lib-datepicker-adapter',
    templateUrl: './datepicker-adapter.component.html',
    styleUrls: ['./datepicker-adapter.component.scss'],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
    host: { class: 'datepicker-adapter' },
    standalone: false
})
export class DatepickerAdapterComponent extends BaseFormControl
    implements DoCheck {
    @ViewChild('customNavigation')
    customNavigationTmpl: TemplateRef<any>;
    @ViewChild('inputElement')
    input: ElementRef;

    @Input() label: string;
    @Input() labelPosition: 'top' | 'left' = 'top';
    @Input() placeholder = 'Select Date';
    @Input() height: any;
    @Input() width: any;
    @Input() hideTodayButton = false;
    @Input() validation: Function;
    @Input() dateWithTime = false;
    @Input() disabled = false;
    @Input() id: any;

    @Input() seconds = false;
    @Input() meridian = false;
    @Input() hourStep = 1;
    @Input() minuteStep = 1;
    @Input() secondStep = 1;

    @Input() withoutMaxDate = false;

    @Input() translatedText: Partial<Record<TranslationKeysOfDatepickerAdapter, string>>;

    @Output() valueChanges = new EventEmitter();
    @Output() change = new EventEmitter();

    @HostBinding('class') get cssClass() {
        return `d-flex ${
            this.labelPosition === 'left' ? 'flex-row' : 'flex-column'
        } lib-datepicker-adapter--${this.labelPosition}`;
    }

    validationError: string;

    // tslint:disable-next-line:variable-name
    _disabled = true;

    model: Date;
    icons = {
        faCalendar: faCalendar,
        faClock: faClock
    };

    time: NgbTimeStruct = {
        hour: 13,
        minute: 0,
        second: 0
    };

    template: EmbeddedViewRef<any>;
    monthElem: any;

    root: any;
    isCustomNavigation = false;

    sizeS: boolean;
    sizeL: boolean;

    ngOnInit() {
        super.ngOnInit();

        setTimeout(() => {
            this.sizeS = this.input.nativeElement.parentNode.parentNode.classList.contains(
                'size-s'
            );

            this.sizeL = this.input.nativeElement.parentNode.parentNode.classList.contains(
                'size-l'
            );
        });
    }

    ngDoCheck() {
        if (this.template) {
            this.template.detectChanges();
        }
    }

    getTodayNgbDate(): NgbDateStruct {
        const nowDate = new Date();
        return {
            day: nowDate.getDate(),
            month: nowDate.getMonth() + 1,
            year: nowDate.getFullYear()
        };
    }

    getToday() {
        this.model = new Date();
        this.dateChangedHandler();
    }

    dateChangedHandler() {
        if (typeof this.model === 'string') {
            return;
        }

        if (typeof this.validation === 'function') {
            this.validationError = this.validation(this.value);
        }

        if (this.ngControl) {
            this.onChange(this.model);
            this.onTouched();
        }

        this.valueChanges.emit(this.model);
        this.change.emit(this.model);
        this._disabled = false;
    }

    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    toggle(d: any) {
        d.toggle();
        if (d._cRef && d._cRef.location) {
            this.monthElem = d._cRef.location.nativeElement.querySelector(
                '.ngb-dp-month-name'
            );
            this.monthElem.addEventListener('click', this.openCustomNavigation);
        }
    }

    onDatePickerClosed() {
        this.isCustomNavigation = false;
        this.destroyClick();
        this.destroyCustomNavigation();
    }

    onTimeChanged($event: any) {
        const hour = $event.hour;
        const minute = $event.minute;
        const second = $event.second;
        this.model.setHours(hour);
        this.model.setMinutes(minute);
        this.model.setSeconds(second);
        this.setInputValue(hour, minute);
        this.valueChanges.emit(this.model);
    }

    setInputValue(hour: any, minute: any) {
        if (!this.model) {
            return;
        }
        const year = this.model.getFullYear();
        const month =
            this.model.getMonth() < 9
                ? '0' + (this.model.getMonth() + 1).toString()
                : (this.model.getMonth() + 1).toString();
        const day =
            this.model.getDate() < 10
                ? '0' + this.model.getDate()
                : this.model.getDate();
        const newHour = hour < 10 ? '0' + hour : hour;
        const newMinute = minute < 10 ? '0' + minute : minute;
        this.input.nativeElement['value'] =
            year + '-' + month + '-' + day + ', ' + newHour + ':' + newMinute;
    }

    destroyClick() {
        if (!this.monthElem) {
            return;
        }

        this.monthElem.removeEventListener('click', this.openCustomNavigation);
        this.monthElem = null;
    }

    destroyCustomNavigation() {
        if (!this.template) {
            return;
        }

        this.template.destroy();
        this.template = null;
        this.root.parentNode.removeChild(this.root);
    }

    openCustomNavigation = () => {
        this.isCustomNavigation = true;
        const currentDate = this.model ? this.model : new Date();
        this.template = this.customNavigationTmpl.createEmbeddedView({
            $implicit: '',
            currDate: currentDate
        });
        this.template.detectChanges();
        this.root = this.template.rootNodes[0];
        this.monthElem.parentNode.appendChild(this.root);
    };

    goToDateAhead() {
        this.isCustomNavigation = false;
        this.destroyCustomNavigation();
        this.cdr.detectChanges();
    }

    ngOnDestroy() {
        this.destroyClick();
        this.destroyCustomNavigation();
    }
}
