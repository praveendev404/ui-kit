import {
    AfterViewInit,
    booleanAttribute,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    Directive,
    ElementRef,
    HostBinding,
    inject,
    Injector,
    Input,
    OnDestroy,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { fromEvent, Subject } from 'rxjs';

import { InputComponent } from '../input/input.component';
import { ErrorControlDirective } from '../../validation/error-control/error-control.directive';

@Directive({
    selector: '[libTextElement]',
    standalone: false
})
export class ContentEditableTextElementDirective {}

@Directive({
    selector: '[libInlineInput]',
    host: {
        '(controlValueChange)': 'handleInput()',
        '(blur)': 'handleBlur()',
        '(focusin)': 'focusChanged(true)',
    },
    providers: [
        {
            provide: ErrorControlDirective,
            useFactory: () => {
                const input = inject(InlineInputComponent, { host: true });
                return input.injector.get(ErrorControlDirective, null, {
                    host: true,
                    optional: true,
                });
            },
        },
    ],
    standalone: false
})
export class LibInlineInputElementDirective
    implements AfterViewInit, OnDestroy
{
    inputComponent = inject(InputComponent);
    valueChanges = new Subject<string>();
    statusChanges = new Subject<boolean | null>();
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);
    focused = false;
    destroy$ = new Subject();

    get input(): HTMLInputElement {
        return this.inputComponent.input.nativeElement;
    }

    set value(v: string) {
        this.inputComponent.writeValue(v);
    }

    get value() {
        return this.inputComponent.value;
    }

    ngAfterViewInit() {
        fromEvent(this.input, 'keyup')
            .pipe(takeUntil(this.destroy$))
            .subscribe((e: KeyboardEvent) => {
                if (e.key === 'Enter') {
                    this.input.blur();
                } else if (e.key === 'Escape') {
                    this.reset();
                }
            });
    }

    focus(options?: FocusOptions) {
        this.input.focus(options);
    }

    blur() {
        this.input.blur();
    }

    handleInput() {
        this.valueChanges.next(this.value);
    }

    handleBlur() {
        this.focusChanged(false);
    }

    reset() {
        this.statusChanges.next(null);
    }

    focusChanged(isFocused: boolean) {
        this.focused = isFocused;
        this.statusChanges.next(isFocused);
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}

@Component({
    selector: 'lib-inline-input',
    templateUrl: './inline-input.component.html',
    styleUrl: './inline-input.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class InlineInputComponent
    implements ControlValueAccessor, AfterViewInit, OnDestroy
{
    @Input() defaultValue: string | undefined;
    /**
     * Show pencil button flag
     */
    @Input({ transform: booleanAttribute }) showPencilButton = true;
    /**
     * Reset to empty state on first focus or not.
     * By default, reset is happened if control is untouched.
     */
    @Input({ transform: booleanAttribute }) resetToEmpty = true;

    @ContentChild(ContentEditableTextElementDirective, {
        static: true,
        read: ElementRef,
    })
    contentElement: ElementRef<HTMLDivElement> | null = null;
    @ContentChild(LibInlineInputElementDirective, {
        static: true,
    })
    libInputElement: LibInlineInputElementDirective | null = null;

    @ViewChild('contentContainer', {
        static: true,
        read: ElementRef,
    })
    containerElement: ElementRef<HTMLDivElement> | null = null;
    @HostBinding('class.disabled')
    isDisabled = false;

    valueToRestore = '';

    injector = inject(Injector);

    private resizeObserver: ResizeObserver | null = null;
    private _value: string;
    private onChangeFn: (value: string) => void;
    private onTouchedFn: () => void;
    private destroy$ = new Subject();
    private ngControl = inject(NgControl);
    private cdr = inject(ChangeDetectorRef);

    get value() {
        return this._value;
    }
    set value(v: string) {
        this._value = v;
        this.contentElement!.nativeElement.innerText = this.value;
        this.libInputElement.value = v;
    }

    constructor() {
        this.ngControl.valueAccessor = this;
    }

    writeValue(value: string) {
        this.value = value;
        this.libInputElement.value = value;
    }

    registerOnChange(fn: (value: string) => void) {
        this.onChangeFn = fn;
    }

    registerOnTouched(fn: () => void) {
        this.onTouchedFn = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    ngAfterViewInit() {
        this.resizeObserver = new ResizeObserver(([entry]) => {
            let width = entry.borderBoxSize[0].inlineSize;
            if (this.libInputElement.inputComponent.maxlength) {
                width += 62;
            }
            this.libInputElement.input.style.width = width + 'px';
        });
        this.syncStyles();
        this.libInputElement.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((v) => {
                this.value = v;
            });
        this.libInputElement.statusChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe((v) => {
                if (v === null) {
                    this.handleRestore();
                } else {
                    this.updateFocusState();
                }
            });
        this.resizeObserver.observe(this.containerElement!.nativeElement);
    }

    updateFocusState() {
        if (this.libInputElement.focused) {
            this.handleFocus();
        } else {
            this.handleBlur();
        }
    }

    handleFocus() {
        this.valueToRestore = this.value;

        if (this.needResetToEmpty()) {
            setTimeout(() => {
                this.value = '';
            }, 100);
        }
    }

    handleRestore() {
        this.value = this.valueToRestore;
        this.libInputElement.blur();
    }

    handleBlur() {
        if (this.value.trim() === '') {
            this.value = this.valueToRestore;
        }

        if (this.value !== this.valueToRestore) {
            this.onChangeFn(this.value);
            this.onTouchedFn();
        } else if (this.value === this.valueToRestore && this.value === '') {
            this.onChangeFn(this.value);
            this.onTouchedFn();
        }
    }

    handleEdit() {
        this.libInputElement.focus();
        this.libInputElement.input.setSelectionRange(-1, -1);
    }

    ngOnDestroy() {
        this.resizeObserver && this.resizeObserver.disconnect();
        this.destroy$.next();
    }

    private needResetToEmpty() {
        return this.ngControl.untouched && this.resetToEmpty;
    }

    private syncStyles() {
        const textElement = this.contentElement!.nativeElement;
        const textElementStyles = getComputedStyle(textElement);
        Object.assign(this.libInputElement.input.style, {
            fontSize: textElementStyles.fontSize,
            fontWeight: textElementStyles.fontWeight,
            fontFamily: textElementStyles.fontFamily,
            lineHeight: textElementStyles.lineHeight,
            color: textElementStyles.color,
        }) satisfies Partial<CSSStyleDeclaration>;
    }
}
