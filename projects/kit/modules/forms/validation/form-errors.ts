import { InjectionToken } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export const defaultErrors = {
    required: () => 'This field is required',
    range: () => 'Invalid range',
    minlength: ({ requiredLength, actualLength }: any) =>
        `Must be at least ${requiredLength} characters long`,
    maxlength: ({ requiredLength, actualLength }: any) =>
        `Must be max ${requiredLength} characters long`,
    duplicate: () => 'Duplicated field',
    min: ({ min, actual }: any) => `Must be greater than ${min}`,
    pattern: ({ requiredPattern, actualValue }: any) =>
        `The field doesn't match requested format ${requiredPattern}`,
    typingError: ({ required, received }: any) =>
        `Expected ${required}, but got ${received}`,
    customText: (text: string) => text,
    notEqual: ({ value, customTextFn = null }) =>
        customTextFn
            ? customTextFn(value)
            : `The field shouldn't equal ${value}`,
    email: () => 'Email is not valid',
    leadingTrailingSpaces: ({ controlLabel = 'This field' }) =>
        `${controlLabel} cannot contain trailing or leading spaces`
};

export function isErrorState(
    control: AbstractControl | null,
    form?: FormGroupDirective | NgForm | null
): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
        control &&
        control.invalid &&
        (control.dirty || control.touched || isSubmitted)
    );
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
});
