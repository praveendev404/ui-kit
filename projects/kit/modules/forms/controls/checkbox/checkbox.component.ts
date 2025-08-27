import {
    Component,
    Input,
    Output,
    EventEmitter,
    forwardRef,
    HostBinding,
    ViewChild,
    ElementRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxComponent),
            multi: true
        }
    ],
    host: { class: 'lib-checkbox' },
    standalone: false
})
export class CheckboxComponent implements ControlValueAccessor {
    @Input() value: boolean;
    @Input() disabled: boolean;
    @Input() preventDefault = false;
    @Input() undefinedState = false;
    @Input() buttonView = false;
    @Input() label: string;
    /** @deprecated: use {@link appearance} instead*/
    @Input() blueCheck: boolean = false;

    @Input()
    appearance: 'filled' | 'border' | 'unbordered' = 'filled';

    @Input() id: string = 'checkbox';

    @Input() loading = false;

    @Output() change = new EventEmitter();

    @ViewChild('checkbox') checkbox: ElementRef<HTMLInputElement>;

    get icon() {
        if (this.value) {
            return 'facBuildSuccess';
        }

        if (this.isUndefinedState()) {
            return 'minus';
        }

        return null;
    }

    @HostBinding('attr.data-appearance')
    get checkboxAppearance(): this['appearance'] {
        if (this.blueCheckEnabled) {
            return 'unbordered';
        }

        if (!this.isUndefinedState() && !this.value) {
            return 'border';
        }

        if (this.loading) {
            return 'unbordered';
        }

        return this.appearance;
    }

    get blueCheckEnabled() {
        return this.blueCheck && this.value && this.disabled;
    }

    private onChangeCb: any;
    private onTouchedCb: any;

    onChange(): void {
        if (this.disabled) {
            return;
        }

        if (!this.preventDefault) {
            if (!this.undefinedState) {
                this.value = !this.value;
            } else {
                if (this.value === undefined) {
                    this.value = true;
                } else if (this.value === true) {
                    this.value = false;
                } else {
                    this.value = undefined;
                }
            }
        }
        if (this.onTouchedCb) {
            this.onTouchedCb();
        }
        if (this.onChangeCb) {
            this.onChangeCb(this.value);
        }

        this.change.emit(this.value);
    }

    registerOnChange(fn: any) {
        this.onChangeCb = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCb = fn;
    }

    writeValue(obj: any) {
        this.value = obj;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    isUndefinedState(): boolean {
        if (!this.undefinedState) {
            return false;
        }

        return this.value === undefined;
    }

    /*
     *  Prevent click events that come from the `<label/>` element from bubbling. This prevents the
     *  click handler on the host from triggering twice when clicking on the `<label/>` element. After
     *  the click event on the `<label/>` propagates, the browsers dispatches click on the associated
     *  `<input/>`. By preventing clicks on the label by bubbling, we ensure only one click event
     *  bubbles when the label is clicked.
     */
    preventBubblingFromCheckbox(event: MouseEvent) {
        if (
            !!event.target &&
            !this.checkbox.nativeElement.contains(event.target as HTMLElement)
        ) {
            event.stopPropagation();
        }
    }

    /*
     * We always have to stop propagation on the change event.
     * Otherwise the change event, from the input element, will bubble up and
     * emit its event object to the `change` output.
     */
    preventCheckboxChangeEvent(event: Event) {
        event.stopPropagation();
    }
}
