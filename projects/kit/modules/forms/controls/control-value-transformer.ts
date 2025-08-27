export abstract class ControlValueTransformer<From, To> {
    abstract fromControlValue(controlValue: To): From;
    abstract toControlValue(value: From): To;
}
