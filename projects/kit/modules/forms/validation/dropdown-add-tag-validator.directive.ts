import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormControl, ValidatorFn } from '@angular/forms';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';

import { DropdownComponent } from '../controls/dropdown/dropdown.component';

@Directive({
    selector: 'lib-dropdown[libDropdownAddTagValidator]',
    standalone: false
})
export class DropdownAddTagValidatorDirective implements OnInit, OnDestroy {
    @Input('libDropdownAddTagValidator') validator: ValidatorFn;
    @Input('libDropdownAddTagErrorMessage') errorMessage = '';

    private control: UntypedFormControl;
    private errorElement: HTMLDivElement;
    private destroy$ = new Subject();
    constructor(private dropdown: DropdownComponent) {}

    ngOnInit(): void {
        this.control = new UntypedFormControl('', this.validator);
        this.control.statusChanges
            .pipe(delay(0), takeUntil(this.destroy$))
            .subscribe(status => {
                if (status === 'INVALID') {
                    if (!this.errorElement) {
                        this.errorElement = document.createElement('div');
                        this.errorElement.className = 'color-red mt-2';
                        this.errorElement.textContent =
                            this.errorMessage || 'Add tag error';
                    }
                    if (this.dropdown.addTagContainerRef) {
                        this.dropdown.addTagContainerRef.element.nativeElement.parentElement.appendChild(
                            this.errorElement
                        );
                    }
                } else if (this.errorElement?.parentElement) {
                    this.errorElement.parentElement.removeChild(
                        this.errorElement
                    );
                    this.errorElement = null;
                }
            });
        this.dropdown.ngSelect?.searchEvent
            .pipe(takeUntil(this.destroy$))
            .subscribe(({ term }) => {
                this.control.setValue(term);
            });

        const addTagFunction =
            this.dropdown.addTagFunction || this.dropdown.addTagFnImpl;
        const control = this.control;

        this.dropdown.addTagFn = this.dropdown.addTag
            ? function() {
                  if (control.valid) {
                      return addTagFunction.apply(this, arguments);
                  } else {
                      return Promise.resolve(null);
                  }
              }
            : undefined;
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
