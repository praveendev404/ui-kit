import {
    Directive,
    ElementRef,
    NgZone,
    OnInit,
    OnDestroy,
    ChangeDetectorRef,
    Input
} from '@angular/core';

import { DropdownComponent } from '../modules/forms/controls/dropdown/dropdown.component';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'lib-dropdown[keep-position]',
    standalone: false
})
// tslint:disable-next-line:directive-class-suffix
export class NgSelectAdjustPosition implements OnInit, OnDestroy {
    @Input() closeByScroll: boolean;

    currentItem: any;

    constructor(
        private dropdown: DropdownComponent,
        private ref: ElementRef,
        private cdr: ChangeDetectorRef,
        private zone: NgZone
    ) {}

    ngOnInit() {
        this.currentItem = this.ref.nativeElement;

        while (this.currentItem) {
            if (this.currentItem.scrollHeight > this.currentItem.clientHeight) {
                this.handleScroll();
                break;
            }
            this.currentItem = this.currentItem.parentNode;
        }
    }

    handleScroll() {
        this.zone.runOutsideAngular(() => {
            this.currentItem.addEventListener('wheel', this.handleWheel);
        });
    }

    handleWheel = () => {
        if (this.dropdown.ngSelect.isOpen) {
            if (!this.closeByScroll) {
                (this.dropdown.ngSelect as any)['_handleDropdownPosition']();
            } else {
                this.dropdown.ngSelect.close();
                this.cdr.detectChanges();
            }
        }
    };

    ngOnDestroy() {
        if (this.currentItem) {
            this.currentItem.removeEventListener('wheel', this.handleWheel);
        }
    }
}
