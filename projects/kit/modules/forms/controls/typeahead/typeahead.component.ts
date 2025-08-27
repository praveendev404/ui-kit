import { Component, Input, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, OperatorFunction, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { InputComponent } from '../input/input.component';

@Component({
    selector: 'lib-typeahead',
    templateUrl: './typeahead.component.html',
    styleUrls: ['./typeahead.component.scss', '../input/input.component.scss'],
    host: { class: 'lib-typeahead' },
    standalone: false
})
export class TypeaheadComponent extends InputComponent {

    @Input() debounceTime = 200;

    @Input() items: string[] = [];

    @ViewChild(NgbTypeahead) instance: NgbTypeahead;

    private focus$ = new Subject<string>();

    search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
        const debouncedText$ = text$.pipe(
            debounceTime(this.debounceTime),
            distinctUntilChanged()
        );

        return merge(debouncedText$, this.focus$).pipe(
            map(term => (
                    (term === ''
                            ? this.items
                            : (this.items || []).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)
                    ) || []
                ).slice(0, 10)
            )
        );
    };

    handleFocus(event: any) {
        this.focus$.next(event.target.value);
    }

    handleSelect(event: NgbTypeaheadSelectItemEvent) {
        this.value = event.item;
        this.onChange(event.item);
    }
}
