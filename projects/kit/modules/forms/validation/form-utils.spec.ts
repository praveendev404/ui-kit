import {
    appendError,
    ArrayByFieldDuplication,
    getAllErrors,
    notEqualValue,
    notEqualValues,
    notEmptyString,
    removeError,
    showServerValidationErrors,
    uniqueField,
    validateFormAndDisplayErrors,
    noLeadingTrailingSpaces,
    debounceValidator
} from '@dagility-ui/kit';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { fakeAsync, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

class TestClass {
    removeError: any = removeError;
    appendError: any = appendError;
    getAllErrors: any = getAllErrors;
    validateFormAndDisplayErrors: any = validateFormAndDisplayErrors;
    arrayByFieldDuplication: any = ArrayByFieldDuplication;
    showServerValidationErrors: any = showServerValidationErrors;
    uniqueField: any = uniqueField;
    notEqualValue: any = notEqualValue;
    notEqualValues: any = notEqualValues;
    notEmptyString: any = notEmptyString;
}

describe('FormUtils', () => {
    let testClass: TestClass;
    let abstractControl: any;
    let formControl: any;
    let notEmptyStringFormControl: UntypedFormControl;
    let notTrailingSpacesControl: UntypedFormControl;
    let arrayByFieldDuplicationParams: any[];

    beforeEach(() => {
        testClass = new TestClass();

        abstractControl = {
            errors: {
                someKey: {}
            },
            markAsTouched: () => {},
            setErrors: () => {},
            value: 'someValue'
        };

        formControl = {
            controls: {
                someKey: new UntypedFormArray([])
            },
            get: () => new UntypedFormArray([])
        };
        (formControl.controls.someKey.errors as any) = {
            someKey: {}
        };

        notEmptyStringFormControl = new UntypedFormControl('', notEmptyString());
        notTrailingSpacesControl = new UntypedFormControl(
            '',
            noLeadingTrailingSpaces('Control Label')
        );
        arrayByFieldDuplicationParams = [
            formControl,
            'someValue',
            'someValue',
            'someKey',
            true
        ];
    });

    it('removeError should be called', () => {
        spyOn(testClass, 'removeError').and.callThrough();
        testClass.removeError(abstractControl, 'someKey', true);
        expect(testClass.removeError).toHaveBeenCalledWith(
            abstractControl,
            'someKey',
            true
        );
    });

    it('removeError should be called with markTouched = false and another error', () => {
        spyOn(testClass, 'removeError').and.callThrough();
        abstractControl.errors = { ...abstractControl.errors, anotherKey: {} };
        testClass.removeError(abstractControl, 'someKey');
        expect(testClass.removeError).toHaveBeenCalledWith(
            abstractControl,
            'someKey'
        );
    });

    it('removeError should be called without errors', () => {
        spyOn(testClass, 'removeError').and.callThrough();
        abstractControl.errors = null;
        testClass.removeError(abstractControl, 'someKey');
        expect(testClass.removeError).toHaveBeenCalledWith(
            abstractControl,
            'someKey'
        );
    });

    it('removeError should be called without control', () => {
        spyOn(testClass, 'removeError').and.callThrough();
        testClass.removeError(null, 'someKey');
        expect(testClass.removeError).toHaveBeenCalledWith(null, 'someKey');
    });

    it('appendError should be called', () => {
        spyOn(testClass, 'appendError').and.callThrough();
        testClass.appendError(abstractControl, 'someKey', true, true);
        expect(testClass.appendError).toHaveBeenCalledWith(
            abstractControl,
            'someKey',
            true,
            true
        );
    });

    it('appendError should be called without control', () => {
        spyOn(testClass, 'appendError').and.callThrough();
        abstractControl = null;
        testClass.appendError(abstractControl, 'someKey');
        expect(testClass.appendError).toHaveBeenCalledWith(
            abstractControl,
            'someKey'
        );
    });

    it('appendError should be called without errors and markTouched', () => {
        spyOn(testClass, 'appendError').and.callThrough();
        abstractControl.errors = null;
        testClass.appendError(abstractControl, 'someKey');
        expect(testClass.appendError).toHaveBeenCalledWith(
            abstractControl,
            'someKey'
        );
    });

    it('getAllErrors should be called', () => {
        spyOn(testClass, 'getAllErrors').and.callThrough();
        testClass.getAllErrors(formControl, ['']);
        expect(testClass.getAllErrors).toHaveBeenCalledWith(formControl, ['']);
    });

    it('getAllErrors should be called without FormArray', () => {
        spyOn(testClass, 'getAllErrors').and.callThrough();
        formControl.controls.someKey = {};
        testClass.getAllErrors(formControl, ['']);
        expect(testClass.getAllErrors).toHaveBeenCalledWith(formControl, ['']);
    });

    it('validateFormAndDisplayErrors should be called', () => {
        spyOn(testClass, 'validateFormAndDisplayErrors').and.callThrough();
        testClass.validateFormAndDisplayErrors(formControl);
        expect(testClass.validateFormAndDisplayErrors).toHaveBeenCalledWith(
            formControl
        );
    });

    it('validateFormAndDisplayErrors should be called', () => {
        spyOn(testClass, 'validateFormAndDisplayErrors').and.callThrough();
        testClass.validateFormAndDisplayErrors(formControl);
        expect(testClass.validateFormAndDisplayErrors).toHaveBeenCalledWith(
            formControl
        );
    });

    it('validateFormAndDisplayErrors should be called without FormArray', () => {
        spyOn(testClass, 'validateFormAndDisplayErrors').and.callThrough();

        const stubFn = () => {};
        formControl.get = () => ({
            setErrors: stubFn,
            markAsTouched: stubFn,
            markAsDirty: stubFn,
            updateValueAndValidity: stubFn
        });

        testClass.validateFormAndDisplayErrors(formControl);
        expect(testClass.validateFormAndDisplayErrors).toHaveBeenCalledWith(
            formControl
        );
    });

    it('ArrayByFieldDuplication should be called', () => {
        spyOn(testClass, 'arrayByFieldDuplication').and.callThrough();

        spyOn(formControl, 'get').and.returnValue(
            new UntypedFormArray([
                new UntypedFormGroup({
                    someValue: new UntypedFormControl('someValue')
                }),
                new UntypedFormGroup({
                    someValue: new UntypedFormControl('someValue')
                })
            ])
        );

        testClass.arrayByFieldDuplication(...arrayByFieldDuplicationParams);

        expect(testClass.arrayByFieldDuplication).toHaveBeenCalledWith(
            ...arrayByFieldDuplicationParams
        );
    });

    it('ArrayByFieldDuplication should be called with group[prop].length <= 1', () => {
        spyOn(testClass, 'arrayByFieldDuplication').and.callThrough();

        spyOn(formControl, 'get').and.returnValue(
            new UntypedFormArray([
                new UntypedFormGroup({
                    someValue: new UntypedFormControl('someValue')
                })
            ])
        );

        testClass.arrayByFieldDuplication(...arrayByFieldDuplicationParams);

        expect(testClass.arrayByFieldDuplication).toHaveBeenCalledWith(
            ...arrayByFieldDuplicationParams
        );
    });

    it('ArrayByFieldDuplication should be called without value', () => {
        spyOn(testClass, 'arrayByFieldDuplication').and.callThrough();

        spyOn(formControl, 'get').and.returnValue(
            new UntypedFormArray([
                new UntypedFormGroup({
                    anotherValue: new UntypedFormControl('anotherValue')
                })
            ])
        );

        testClass.arrayByFieldDuplication(...arrayByFieldDuplicationParams);

        expect(testClass.arrayByFieldDuplication).toHaveBeenCalledWith(
            ...arrayByFieldDuplicationParams
        );
    });

    it('ArrayByFieldDuplication should be called without controlsArray', () => {
        spyOn(formControl, 'get').and.returnValue(null);
        expect(testClass.arrayByFieldDuplication(formControl)).toBeTrue();
    });

    it('showServerValidationErrors should be called', () => {
        spyOn(testClass, 'showServerValidationErrors').and.callThrough();

        testClass.showServerValidationErrors(
            new UntypedFormGroup({
                someField: new UntypedFormControl('someValue')
            }),
            {
                error: {
                    errors: [
                        {
                            field: 'someField',
                            rejectedValue: 'someValue'
                        }
                    ]
                }
            }
        );

        expect(testClass.showServerValidationErrors).toHaveBeenCalled();
    });

    it('showServerValidationErrors should be called with another rejectedValue', () => {
        spyOn(testClass, 'showServerValidationErrors').and.callThrough();

        testClass.showServerValidationErrors(
            new UntypedFormGroup({
                someField: new UntypedFormArray([new UntypedFormControl('someValue')])
            }),
            {
                error: {
                    errors: [
                        {
                            field: 'someField',
                            rejectedValue: 'anotherValue'
                        }
                    ]
                }
            }
        );

        expect(testClass.showServerValidationErrors).toHaveBeenCalled();
    });

    it('showServerValidationErrors should be called without errors', () => {
        spyOn(testClass, 'showServerValidationErrors').and.callThrough();
        testClass.showServerValidationErrors({}, { error: {} });
        expect(testClass.showServerValidationErrors).toHaveBeenCalled();
    });

    it('uniqueField should return unique true', () => {
        expect(
            testClass.uniqueField(
                {
                    someValue: {}
                },
                {}
            )(abstractControl)
        ).toEqual({ unique: true });
    });

    it('uniqueField should return null', () => {
        expect(
            testClass.uniqueField(
                {
                    anotherValue: {}
                },
                {}
            )(abstractControl)
        ).toBeNull();
    });

    it('notEmptyString should return null if there is no whitespaces', () => {
        const testString = ' this is a    test String ';
        notEmptyStringFormControl.setValue(testString);
        notEmptyStringFormControl?.updateValueAndValidity();
        expect(notEmptyStringFormControl.valid).toBeTrue();
    });

    it('notEmptyString should return error if the string is empty', () => {
        const testString = '';
        notEmptyStringFormControl.setValue(testString);
        notEmptyStringFormControl?.updateValueAndValidity();
        expect(notEmptyStringFormControl.valid).not.toBeTrue();
    });

    it('notEmptyString should return error if string contains only whitespaces', () => {
        const testString =
            '       \f\n\r\t\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000';
        notEmptyStringFormControl.setValue(testString);
        notEmptyStringFormControl?.updateValueAndValidity();
        expect(notEmptyStringFormControl.valid).not.toBeTrue();
    });

    describe('no leading trailing spaces', () => {
        describe('valid control', () => {
            it('control contains not a string', () => {
                notTrailingSpacesControl.patchValue(2333);
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeTrue();
            });

            it(`string is '123'`, () => {
                notTrailingSpacesControl.patchValue('123');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeTrue();
            });

            it(`string is '123 456'`, () => {
                notTrailingSpacesControl.patchValue('123 456');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeTrue();
            });

            it(`string is 'd  d'`, () => {
                notTrailingSpacesControl.patchValue('d  d');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeTrue();
            });
        });

        describe('invalid control', () => {
            it(`string is ' 123'`, () => {
                notTrailingSpacesControl.patchValue(' 123');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeFalse();
            });

            it(`string is '123 '`, () => {
                notTrailingSpacesControl.patchValue('123 ');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeFalse();
            });

            it(`string is ' 123 '`, () => {
                notTrailingSpacesControl.patchValue(' 123 ');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeFalse();
            });

            it(`string is '  12 3  '`, () => {
                notTrailingSpacesControl.patchValue('  12 3  ');
                notTrailingSpacesControl.updateValueAndValidity();
                expect(notTrailingSpacesControl.valid).toBeFalse();
            });
        });

        it('test debounce validator', fakeAsync(() => {
            const mockValidator = jasmine.createSpy();
            mockValidator.and.returnValue(of(null));
            const control = new UntypedFormControl(
                '',
                [],
                [debounceValidator(mockValidator)]
            );

            for (let i = 0; i < 3; i++) {
                control.patchValue(i);
                control.updateValueAndValidity();
            }

            tick(200);
            expect(mockValidator).toHaveBeenCalledOnceWith(control);
        }));
    });
});
