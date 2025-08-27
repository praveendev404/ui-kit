import {
    AbstractControl,
    UntypedFormGroup,
    UntypedFormArray,
    ValidatorFn,
    AsyncValidatorFn,
    isFormArray,
    FormGroup,
    FormArray,
    isFormGroup
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export function removeError(
    control: AbstractControl,
    errorKey: string,
    markTouched: boolean = false
) {
    if (control?.errors && control.errors[errorKey]) {
        delete control.errors[errorKey];
        if (markTouched) {
            control.markAsTouched();
        }
        if (Object.keys(control.errors).length === 0) {
            control.setErrors(undefined);
        } else {
            control.setErrors(control.errors);
        }
    }
}

export function appendError(
    control: AbstractControl,
    errorKey: string,
    errorValue = true,
    markTouched: boolean = false
) {
    if (markTouched) {
        control.markAsTouched();
    }
    if (!control) {
        return;
    }
    if (!control.errors) {
        control.setErrors({ [errorKey]: errorValue });
    } else {
        control.errors[errorKey] = errorValue;
        control.setErrors(control.errors);
    }
}

export class FormErrorsCollector {
    needToCheckControl(control: AbstractControl, path: string[]) {
        return true;
    }

    collect(control: FormGroup | FormArray, path: string[] = []) {
        let errors: FormControlIssue[] = [];

        Object.entries(control.controls).forEach(([key, childControl]) => {
            const newPath = [...path, key];

            if (!this.needToCheckControl(control, newPath)) {
                return;
            }

            if (isFormArray(childControl) || isFormGroup(childControl)) {
                errors = [...errors, ...this.collect(childControl, newPath)];
            }

            const controlErrors = childControl.errors;

            if (controlErrors) {
                Object.keys(controlErrors).forEach(errorKey => {
                    errors.push({
                        control: childControl,
                        controlName: key,
                        errorName: errorKey,
                        errorValue: controlErrors[errorKey],
                        errorPath: newPath
                    });
                });
            }
        });

        return errors;
    }
}

export type FormControlIssue<
    Control extends AbstractControl = AbstractControl
> = {
    control: Control;
    controlName: string;
    errorName: string;
    errorValue: unknown;
    errorPath: string[];
};

const errorCollector = new FormErrorsCollector();

export const getAllErrors = errorCollector.collect.bind(
    errorCollector
) as typeof errorCollector['collect'];

export function validateFormAndDisplayErrors(
    form: UntypedFormGroup | UntypedFormArray
) {
    Object.keys(form.controls).forEach(controlName => {
        const control = form.get(controlName);
        if (
            control instanceof UntypedFormGroup ||
            (control instanceof UntypedFormArray && control.controls)
        ) {
            validateFormAndDisplayErrors(control);
        } else {
            control.setErrors(control.errors);
            control.markAsTouched();
            control.markAsDirty();
            control.updateValueAndValidity();
        }
    });
}

export function ArrayByFieldDuplication(
    formGroup: UntypedFormGroup,
    arrayKey: string,
    fieldKey: string,
    errorKey: string,
    markTouched: boolean = true
) {
    const controlsArray = formGroup.get(arrayKey) as UntypedFormArray;

    if (controlsArray) {
        const group: {
            [key: string]: AbstractControl[];
        } = controlsArray.controls.reduce((acc: Record<string, any>, cur) => {
            const value = cur.value[fieldKey];
            if (value) {
                acc[value] = (acc[value] || []).concat(cur.get(fieldKey));
            }
            return acc;
        }, {});
        for (const prop in group) {
            if (group[prop].length > 1) {
                group[prop].forEach(control => {
                    appendError(control, errorKey, true, markTouched);
                });
            } else {
                removeError(group[prop][0], errorKey, markTouched);
            }
        }

        return Object.values(group).reduce(
            (acc, g) => acc && g.length === 1,
            true
        );
    }

    return true;
}

export function showServerValidationErrors(
    form: UntypedFormGroup | UntypedFormArray,
    response: HttpErrorResponse
) {
    const errors = response.error.errors || [];

    errors.forEach((error: any) => {
        const field = error.field.split('.');
        const control = (form.controls as Record<string, any>)[
            field[field.length - 1]
        ];

        if (control && control.value === error.rejectedValue) {
            control.setErrors({ customText: error.defaultMessage });
            control.markAsTouched();
        } else {
            Object.keys(form.controls).forEach(controlName => {
                const formControl = (form.controls as Record<string, any>)[
                    controlName
                ];

                if (!formControl.controls) {
                    return;
                }
                showServerValidationErrors(
                    formControl,
                    new HttpErrorResponse({
                        error: { errors: [error] }
                    })
                );
            });
        }
    });
}

export function uniqueField(values: Record<string, any>, ignoreValue: any) {
    return function(control: AbstractControl) {
        return values[control.value] && control.value !== ignoreValue
            ? { unique: true }
            : null;
    };
}

export function notEqualValue(value: string, customTextFn = null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any | null } =>
        (control.value || '') === value
            ? { notEqual: { value: control.value, customTextFn } }
            : null;
}

export function notEqualValues(
    values: string[],
    customTextFn = null
): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any | null } =>
        values.includes(control.value || '')
            ? { notEqual: { value: control.value, customTextFn } }
            : null;
}
export function notEmptyString(): ValidatorFn {
    const emptyOrWhiteSpacePattern = new RegExp(/^$|^\s*$/);

    return (control: AbstractControl): { [key: string]: any | null } =>
        emptyOrWhiteSpacePattern.test(control.value)
            ? { required: { value: control.value } }
            : null;
}

export function noLeadingTrailingSpaces(controlLabel?: string): ValidatorFn {
    return control =>
        typeof control.value === 'string' &&
        (control.value.startsWith(' ') || control.value.endsWith(' '))
            ? { leadingTrailingSpaces: { value: control.value, controlLabel } }
            : null;
}

export function debounceValidator(
    validatorFn: AsyncValidatorFn,
    debounceTime: number = 200
): AsyncValidatorFn {
    return control =>
        timer(debounceTime).pipe(switchMap(() => validatorFn(control)));
}
