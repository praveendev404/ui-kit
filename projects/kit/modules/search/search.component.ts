import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    Output
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

const ENTER = 'Enter';

@Component({
    selector: 'lib-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchComponent),
            multi: true
        }
    ],
    host: { class: 'lib-search' },
    standalone: false
})
export class SearchComponent implements ControlValueAccessor {
    @Input()
    width: number;
    @Input()
    height: number;
    @Input()
    align: string;
    @Input()
    fontSize = 12;
    @Input()
    searchTermLength: number;
    @Input()
    value = '';
    @Input()
    disabled = false;
    @Input()
    placeholder = 'Search';
    @Input() id: string = 'search';
    @Output()
    enterPressed: EventEmitter<any> = new EventEmitter();
    @Output()
    searchText: EventEmitter<string> = new EventEmitter<string>();
    searchTerm$ = new Subject<string>();
    isFocused = false;

    private onChange: Function;
    private onTouch: Function;

    constructor() {}

    onKeyUp(event: any): void {
        const { value } = event.target;
        this.searchTerm$.next(value);
        this.writeValue(value);

        if (event.code === ENTER) {
            this.enterPressed.emit();
        }
    }

    search = (text: Observable<string>) =>
        text.pipe(
            debounceTime(200),
            distinctUntilChanged(),
            map(term => {
                if (this.onChange) {
                    this.onChange(term);
                }
                if (this.onTouch) {
                    this.onTouch();
                }
                if (!term.length) {
                    this.searchTerm$.next(term);
                }
                return term.length < this.searchTermLength
                    ? []
                    : this.searchText.emit(term);
            })
        );

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn;
    }

    writeValue(obj: any) {
        this.value = obj;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    setFocusWidthWithHover(isFocus: boolean) {
        if (this.isFocused) {
            this.width = isFocus ? this.width + 6 : this.width - 6;
        }
    }
}
