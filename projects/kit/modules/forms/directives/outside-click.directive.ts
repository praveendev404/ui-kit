import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
    selector: '[libOutsideClick]',
    host: {
        '(document:mousedown)': 'onClick($event)'
    },
    standalone: false
})
export class OutsideClickDirective {
    @Output() clickedOutside = new EventEmitter<void>();

    private disabledValue = false;

    constructor(private elementRef: ElementRef) {}

    get disabled() {
        return this.disabledValue;
    }

    set disabled(value: boolean) {
        this.disabledValue = value;
    }

    onClick(event: any) {
        if (this.disabled || !event.target) {
            return;
        }

        // if clicked on context help or on element inside .prevent-outside-click or toastr
        if (
            event.target.closest('.context-help-wrap') ||
            event.target.closest('.prevent-outside-click') ||
            event.target.closest('.toastr')
        ) {
            return;
        }

        // if context help exist
        const contextHelpEls: any = document.getElementsByClassName(
            'context-help-wrap'
        );
        Object.entries(contextHelpEls).forEach((entry: any) => {
            const contextHelpEl = entry[1];
            contextHelpEl.parentNode.removeChild(contextHelpEl);
        });

        const eventClassList = event.target.classList;
        const foundBodyItem = eventClassList
            ? eventClassList.value.search('ng-option') !== -1
            : false;
        // .ng-dropdown-panel-items  is necessary for a situation when there is a dropdown,
        // since the dropdown will be attached to the body and this event will emit
        if (
            !this.elementRef.nativeElement.contains(event.target) &&
            !foundBodyItem &&
            !document.body.querySelector('.ng-dropdown-panel-items') &&
            !document.body.querySelector('.completion-wrapper') &&
            !document.body.querySelector('.edgeops-toast__content') &&
            !document.body.querySelector('.repository-existing-modal') &&
            !document.body.querySelector('.reject-approval-modal') &&
            !document.body.querySelector('.import-confirm-modal')
        ) {
            this.clickedOutside.emit();
        }
    }
}
