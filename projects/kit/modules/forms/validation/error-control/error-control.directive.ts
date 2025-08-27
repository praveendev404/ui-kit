import {
    Directive,
    Inject,
    Input,
    Optional,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    OnDestroy,
    HostBinding,
    ChangeDetectorRef
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable, EMPTY, merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { FORM_ERRORS, isErrorState } from '../form-errors';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FormSubmitDirective } from '../../directives/form-submit.directive';

@Directive({
    // tslint:disable-next-line
    selector: '[formControl], [formControlName]',
    standalone: false
})
export class ErrorControlDirective implements OnDestroy {
    @Input() customErrors: Record<string, any> = {};

    @Input() formControlName: string;

    @Input() showError = true;

    @HostBinding('class.invalid')
    hasErrors: boolean;

    get container() {
        return (
            (this.ngControl.valueAccessor as any)['controlContainerRef'] ||
            this.containerRef
        );
    }

    private errorContainerRef: ComponentRef<ErrorMessageComponent>;
    private submit$: Observable<any>;
    private destroy$ = new Subject<boolean>();
    private errors: Record<string, any> = this._errors;

    constructor(
        // tslint:disable-next-line:variable-name
        @Inject(FORM_ERRORS) private _errors: any,
        @Optional() private form: FormSubmitDirective,
        private resolver: ComponentFactoryResolver,
        @Optional() private ngControl: NgControl,
        private containerRef: ViewContainerRef,
        private cdr: ChangeDetectorRef
    ) {
        this.submit$ = this.form ? this.form.submit$ : EMPTY;
    }

    ngOnInit() {
        const control = this.ngControl?.control;
        if (control) {
            merge(control.valueChanges, control.statusChanges, this.submit$)
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    const controlErrors = control.errors;

                    if (isErrorState(control) && controlErrors) {
                        const key = Object.keys(controlErrors)[0];
                        const getError = this.errors[key];
                        if (!getError && !this.customErrors[key]) {
                            console.warn(
                                `Missing default error message for '${key}' error key`
                            );
                            return;
                        }
                        const text =
                            this.customErrors[key] ||
                            getError(controlErrors[key]);
                        if (this.showError) {
                            this.setError(text);
                        } else {
                            this.hasErrors = text != null;
                        }
                    } else {
                        if (this.errorContainerRef) {
                            this.setError(null);
                        } else {
                            this.hasErrors = false;
                        }
                    }

                    this.cdr.detectChanges();
                });
        }
    }

    setError(text: string) {
        if (!this.errorContainerRef) {
            const component = this.resolver.resolveComponentFactory(
                ErrorMessageComponent
            );
            this.errorContainerRef = this.container.createComponent(component);
        }

        this.errorContainerRef.instance.message = text;
        this.hasErrors = text !== null;
        //        this.cdr.markForCheck();
    }

    ngOnDestroy(): void {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}
