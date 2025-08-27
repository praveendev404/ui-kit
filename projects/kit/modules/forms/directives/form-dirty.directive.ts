import { Directive, OnInit, Input, OnDestroy, Self } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { FormSubmitDirective } from './form-submit.directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: 'form[formGroup]:not(.not-check-dirty)',
    exportAs: 'formDirty',
    standalone: false
})
export class FormDirtyDirective implements OnInit, OnDestroy {
    @Input('formGroup') form: UntypedFormGroup | null;
    @Input() listenFromSubmitEvent = true;

    private subscription$: Subscription;

    private originalValue: any;

    constructor(@Self() private formSubmit: FormSubmitDirective) {}

    ngOnInit() {
        if (this.form) {
            this.setOriginalValue();
            this.subscription$ = this.form.valueChanges
                .pipe(map(currentValue => this.isEqual(this.originalValue, this.takeModelSnapshot(currentValue))))
                .subscribe(equals => {
                    if (equals) {
                        this.form.markAsPristine();
                    } else {
                        this.form.markAsDirty();
                    }
                });

            if (this.listenFromSubmitEvent) {
                this.subscription$.add(this.formSubmit.submit$.pipe(filter(() => this.form.valid)).subscribe(() => this.reset()));
            }
        }
    }

    setOriginalValue() {
        this.originalValue = this.takeModelSnapshot(this.form.value);
    }

    reset() {
        this.setOriginalValue();

        this.form.markAsPristine();
    }

    private takeModelSnapshot(model: any) {
        return JSON.stringify(model);
    }

    private isEqual(a: any, b: any) {
        return a === b;
    }

    ngOnDestroy() {
        if (this.subscription$) {
            this.subscription$.unsubscribe();
        }
    }
}
