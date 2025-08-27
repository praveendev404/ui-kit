import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line
    selector: 'form',
    standalone: false
})
export class FormSubmitDirective {
    submit$ = fromEvent(this.element, 'submit').pipe(shareReplay(1));

    constructor(private host: ElementRef<HTMLFormElement>) {}

    get element() {
        return this.host.nativeElement;
    }
}
