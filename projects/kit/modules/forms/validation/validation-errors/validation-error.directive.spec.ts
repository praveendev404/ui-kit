import { ValidationErrorDirective } from '@dagility-ui/kit';

describe('ValidationErrorDirective', () => {
    let testClass: ValidationErrorDirective;

    beforeEach(() => {
        testClass = new ValidationErrorDirective({} as any);
    });

    it('should have validationErrorDirective', () => {
        expect(testClass).not.toBeNull();
    });
});
