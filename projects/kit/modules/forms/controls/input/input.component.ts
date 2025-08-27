import {
    AfterViewInit,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    SimpleChanges
} from '@angular/core';

import { BaseFormControl } from '../base-form-control';
import { LabelPosition } from '../common.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
    selector: 'lib-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    host: { class: 'lib-input' },
    standalone: false
})
export class InputComponent extends BaseFormControl<string, HTMLInputElement>
    implements AfterViewInit {
    isPasswordVisible: boolean = false;

    @Input() type: string = 'text';

    @Input() min: string;

    @Input() max: string;

    @Input() value: string;

    @Input() maxlength: string;

    @Input() labelPosition: LabelPosition = 'top';

    @Input() placeholder: string;

    @Input() clearable: boolean;

    @Input() copyable = false;

    @Input() set setDisable(value: boolean) {
        this.setDisabledState(value);
    }

    @Input() lockByFocus = false;

    @Input() name: string;

    @Input() checked = false;

    @Input() id: string;

    @Input() passwordPreview: boolean = false;

    @Input() strictNumberValidation = false;

    @Input() icon: string | IconProp;

    @Output() clear = new EventEmitter();

    @Output() controlValueChange = new EventEmitter();

    @Output() blur = new EventEmitter();

    get isValidate() {
        return this.type === 'number' && this.strictNumberValidation;
    }

    @HostBinding('class') get cssClass() {
        return `lib-input d-flex ${
            this.labelPosition === 'left' ? 'flex-row' : 'flex-column'
        } lib-input--${this.labelPosition}`;
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.input) {
            const props = ['type', 'min', 'max', 'id', 'name'] as const;
            props.forEach(prop => {
                if (changes[prop]) {
                    this.input.nativeElement[prop] = this[prop];
                }
            });
        }
    }

    ngAfterViewInit(): void {
        this.toggleReadonly(true);
    }

    handleInput(event: any) {
        this.value = event.target.value;
        this.onChange(event.target.value);
        this.controlValueChange.emit(event);
    }

    toggleReadonly(lock: boolean) {
        if (this.readonly || !this.lockByFocus) {
            return;
        }
        this.input.nativeElement.readOnly = lock;
    }

    setDisabledState(isDisabled: boolean) {
        this.input.nativeElement.disabled = isDisabled;
        this.readonly = isDisabled;
    }

    copyToClipboard(inputElement: HTMLInputElement) {
        this.input.nativeElement.disabled = false;
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        this.input.nativeElement.disabled = this.readonly;
    }

    togglePassword() {
        this.type = this.type === 'password' ? 'text' : 'password';
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    validate(type: 'keydown' | 'paste', event: any) {
        if (!this.isValidate) {
            return;
        }

        const validateFns: Record<string, (event: any) => void> = {
            keydown: this.handleKeydown,
            paste: this.handlePaste
        };
        validateFns[type](event);
    }

    handleKeydown(event: any) {
        const code = event?.code?.toLocaleLowerCase();
        const codePieces: string[] = [
            'minus',
            'numpadsubtract',
            'period',
            'comma',
            'numpaddecimal',
            'numpadadd',
            'slash',
            'keye',
            'equal'
        ];
        if (codePieces.includes(code)) {
            event.preventDefault();
        }
    }

    handlePaste(event: any) {
        let paste = (
            event.clipboardData || (window as any).clipboardData
        ).getData('text');
        paste = paste.toUpperCase();
        const value = parseInt(paste);
        const reg = new RegExp('^[0-9]{0,100}$');
        if (!reg.test(paste) || !value || isNaN(event.target.value)) {
            event.preventDefault();
        }
    }

    handleClearBtn() {
        this.clear.emit();
        this.value = '';
    }
}
