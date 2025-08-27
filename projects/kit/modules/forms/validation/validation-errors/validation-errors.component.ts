import {
    Component,
    Input,
    ContentChildren,
    QueryList,
    Optional
} from '@angular/core';
import {
    AbstractControl,
    NgControl,
    ControlContainer,
    UntypedFormGroup,
    UntypedFormArray
} from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

import { BaseFormControl } from '../../controls/base-form-control';
import { ValidationErrorDirective } from './validation-error.directive';
import { isErrorState } from '../form-errors';

@Component({
    selector: 'lib-validation-errors',
    templateUrl: './validation-errors.component.html',
    styleUrls: ['./validation-errors.component.scss'],
    standalone: false
})
export class ValidationErrorsComponent {
    @Input() control:
        | string
        | NgControl
        | BaseFormControl
        | HTMLInputElement
        | AbstractControl;

    @Input() label: string;

    @ContentChildren(ValidationErrorDirective) errorsDirective: QueryList<
        ValidationErrorDirective
    >;

    icons = {
        faExclamationCircle
    };

    constructor(@Optional() private controlContainer: ControlContainer) {}

    get hasDisplayableError() {
        return (
            isErrorState(this.formControl) &&
            this.formControl.validator &&
            Object.keys(this.formControl.errors || []).some(type =>
                this.errorsDirective.some(
                    errorDirective => errorDirective.valError === type
                )
            )
        );
    }

    get displayedErrors() {
        return this.errorsDirective.filter(errorDirective =>
            this.formControl.hasError(errorDirective.valError)
        );
    }

    get isNgControl() {
        return this.control instanceof NgControl;
    }

    get isBaseControl() {
        return this.control instanceof BaseFormControl;
    }

    get isHTMLInputElement() {
        return this.control instanceof HTMLInputElement;
    }

    get isAbstractControl() {
        return this.control instanceof AbstractControl;
    }

    get formControl(): AbstractControl {
        if (this.isNgControl) {
            return (this.control as NgControl).control as any;
        } else if (this.isBaseControl) {
            return (this.control as BaseFormControl).ngControl.control;
        } else if (this.isHTMLInputElement) {
            const name = (this
                .control as HTMLInputElement).attributes.getNamedItem(
                'formControlName'
            ).value;
            return this.getControlByName(name);
        } else if (this.isAbstractControl) {
            return this.control as AbstractControl;
        } else {
            return this.getControlByName(this.control as string);
        }
    }

    getControlByName(name: string) {
        const control = this.controlContainer?.control as UntypedFormGroup | UntypedFormArray;
        return control?.controls[name];
    }
}
