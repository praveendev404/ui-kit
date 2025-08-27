import { AbstractControl, ControlValueAccessor, UntypedFormControl, NgControl } from '@angular/forms';
import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnInit,
    Optional,
    Self,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FormSubmitDirective } from '../directives/form-submit.directive';
import { ErrorControlDirective } from '../validation/error-control/error-control.directive';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class BaseFormControl<T = any, InputElement = any> implements ControlValueAccessor, OnInit {
    @Input() label: string;

    @Input() warningMessage: string;

    @Input() infoMessage: string;

    @Input() value: T;

    @Input() readonly = false;

    @ViewChild('input', { static: true }) input: ElementRef<InputElement>;

    @ViewChild('controlContainer', { read: ViewContainerRef, static: true }) controlContainerRef: ViewContainerRef;

    isRequired = false;

    protected destroy$ = new Subject<boolean>();

    onChange = (_: any) => {};

    onTouched = () => {};

    get warning() {
        return this.warningMessage;
    }

    get info() {
        return this.infoMessage;
    }

    get hasErrors() {
        return this.errorControlDirective ? this.errorControlDirective.hasErrors : false;
    }

    get control() {
        return this.ngControl ? (this.ngControl.control as UntypedFormControl) : new UntypedFormControl();
    }

    constructor(
        @Inject(ErrorControlDirective) @Self() @Optional() private errorControlDirective: ErrorControlDirective,
        @Inject(NgControl) @Self() @Optional() public ngControl: NgControl,
        @Inject(FormSubmitDirective) @Optional() private form: FormSubmitDirective,
        protected cdr: ChangeDetectorRef,
        protected zone: NgZone
    ) {
        if (this.ngControl) {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit() {
        this.checkRequired();
        if (this.ngControl) {
            this.ngControl.control.statusChanges.pipe(takeUntil(this.destroy$)).subscribe(() => this.checkRequired());
        }

        if (this.form && this.form.submit$) {
            this.form.submit$.pipe(takeUntil(this.destroy$)).subscribe(() => this.cdr.markForCheck());
        }
    }

    checkRequired() {
        if (this.ngControl) {
            const validator = this.ngControl.control.validator;
            if (validator) {
                const validationErrors = this.ngControl.control.validator({} as AbstractControl);
                this.isRequired = !!(validationErrors && validationErrors.required);
            } else {
                this.isRequired = false;
            }
        }
    }

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
