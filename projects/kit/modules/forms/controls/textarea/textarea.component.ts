import { AfterViewInit, Component, HostBinding, Input, ViewChild } from '@angular/core';
import { PerfectScrollbarComponent } from 'perfect-scrollbar-angular';

import { BaseFormControl } from '../base-form-control';
import { LabelPosition } from '../common.model';
import { onVisible } from '../../../../utils/utilities';

export type TranslationKeysOfTextarea = 'CHARACTERS_LEFT';

@Component({
    selector: 'lib-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    host: {
        class: 'd-flex flex-column textarea'
    },
    standalone: false
})
export class TextareaComponent extends BaseFormControl
    implements AfterViewInit {
    @Input() placeholder: string;

    @Input() maxlength: string;

    @Input() id: string = 'textarea';

    @Input() copyable = false;

    @Input() labelPosition: LabelPosition = 'top';

    @Input() resize = true;
    @Input() resizeMode:
        | 'none'
        | 'both'
        | 'horizontal'
        | 'vertical'
        | 'initial'
        | 'inherit' = 'none';
    @Input() set setDisable(value: boolean) {
        this.setDisabledState(value);
    }

    @Input() customHeight: boolean = false;

    @Input() translatedText: Partial<Record<TranslationKeysOfTextarea, string>>;

    @ViewChild(PerfectScrollbarComponent) perfectScrollbar: PerfectScrollbarComponent;

    @HostBinding('class.label-left')
    get isLabelPositionLeft() {
        return this.labelPosition === 'left';
    }

    updateTextAreaValueAndSize(){
        this.input.nativeElement.style.height = 'auto';
        this.input.nativeElement.style.height =
            this.input.nativeElement.scrollHeight + 'px';
        this.perfectScrollbar.directiveRef.update();
    }

    handleInput(value: string) {
        this.value = value;
        this.onChange(value);
        this.updateTextAreaValueAndSize();
    }

    setDisabledState(isDisabled: boolean) {
        this.input.nativeElement.disabled = isDisabled;
        this.readonly = isDisabled;
    }

    copyToClipboard(inputElement: HTMLTextAreaElement) {
        this.input.nativeElement.disabled = false;
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        this.input.nativeElement.disabled = this.readonly;
    }

    handleClearBtn() {
        this.value = '';
        this.onChange('');
        setTimeout(() => this.updateTextAreaValueAndSize());
    }

    ngAfterViewInit() {
        const input = this.input.nativeElement;
        const updateStyles = () => {
            input.style.overflow = 'auto';
            input.style.height = input.scrollHeight + 'px';
            input.style.overflow = 'hidden';
            input.parentElement.style.height = input.offsetHeight + 'px';
        };
        if (input.offsetParent) {
            updateStyles();
        } else {
            onVisible(input, elem => updateStyles());
        }
    }
}
