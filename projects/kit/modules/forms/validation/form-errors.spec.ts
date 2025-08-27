import { defaultErrors, FORM_ERRORS, isErrorState } from '@dagility-ui/kit';

class TestClass {
    isErrorState: any = isErrorState;
    formErrors = FORM_ERRORS;
    defaultErrors = defaultErrors;
}

describe('FormErrors', () => {
    let testClass: TestClass;

    beforeEach(() => {
        testClass = new TestClass();
    });

    it('isErrorState should return true', () => {
        expect(
            testClass.isErrorState(
                { invalid: true, dirty: false, touched: false } as any,
                { submitted: true }
            )
        ).toBeTrue();
    });

    it('isErrorState should return true', () => {
        expect(
            testClass.isErrorState(
                { invalid: true, dirty: false, touched: false },
                { submitted: true }
            )
        ).toBeTrue();
    });

    it('defaultErrors.required should return correct value', () => {
        expect(testClass.defaultErrors.required()).toBe(
            'This field is required'
        );
    });

    it('defaultErrors.range should return correct value', () => {
        expect(testClass.defaultErrors.range()).toBe('Invalid range');
    });

    it('defaultErrors.minlength should return correct value', () => {
        expect(testClass.defaultErrors.minlength({ requiredLength: 5 })).toBe(
            'Must be at least 5 characters long'
        );
    });

    it('defaultErrors.maxlength should return correct value', () => {
        expect(testClass.defaultErrors.maxlength({ requiredLength: 5 })).toBe(
            'Must be max 5 characters long'
        );
    });

    it('defaultErrors.duplicate should return correct value', () => {
        expect(testClass.defaultErrors.duplicate()).toBe('Duplicated field');
    });

    it('defaultErrors.min should return correct value', () => {
        expect(testClass.defaultErrors.min({ min: 5 })).toBe(
            'Must be greater than 5'
        );
    });

    it('defaultErrors.pattern should return correct value', () => {
        expect(
            testClass.defaultErrors.pattern({ requiredPattern: 'somePattern' })
        ).toBe(`The field doesn't match requested format somePattern`);
    });

    it('defaultErrors.typingError should return correct value', () => {
        expect(
            testClass.defaultErrors.typingError({ required: 5, received: 10 })
        ).toBe('Expected 5, but got 10');
    });

    it('defaultErrors.customText should return correct value', () => {
        expect(testClass.defaultErrors.customText('someText')).toBe('someText');
    });

    it('defaultErrors.notEqual should return correct value', () => {
        expect(testClass.defaultErrors.notEqual({ value: 'old value' })).toBe(
            `The field shouldn't equal old value`
        );
    });

    it('defaultErrors.leadingTrailingSpaces should return correct value', () => {
        expect(testClass.defaultErrors.leadingTrailingSpaces({})).toBe(
            `This field cannot contain trailing or leading spaces`
        );

        expect(
            testClass.defaultErrors.leadingTrailingSpaces({
                controlLabel: 'Control'
            })
        ).toBe(`Control cannot contain trailing or leading spaces`);
    });
});
