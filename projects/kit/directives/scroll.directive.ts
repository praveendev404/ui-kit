import {
    AfterViewInit,
    ElementRef,
    Input,
    Directive,
    OnDestroy,
    NgModule
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { map, pairwise, filter, startWith } from 'rxjs/operators';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[appScroll]',
    standalone: false
})
export class ScrollDirective implements AfterViewInit, OnDestroy {
    @Input() appScrollDisabled = false;
    @Input() scrollCallback: Function;
    @Input() wheelUpCallback: any;
    @Input() checkLog: boolean;
    @Input() wheeledDownCallback: any;

    // tslint:disable-next-line:variable-name
    private _isOnBottom: boolean = true;

    get isOnBottom(): any {
        return this._isOnBottom;
    }

    @Input()
    set isOnBottom(val: any) {
        this._isOnBottom = val;
    }

    private scrollEvent: Observable<any>;
    private wheelEvent: Observable<any>;
    private scrolledDown: Subscription;
    private scrollingDown: Subscription;
    private scrolledUp: Subscription;
    private wheeledUp: Subscription;
    private scrollingUp: Subscription;
    private wheeledDown: Subscription;

    upCounter = 0;
    downCounter = 0;
    isOnTop = false;

    constructor(public element: ElementRef) {}

    ngAfterViewInit() {
        if (this.appScrollDisabled) {
            return;
        }

        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');
        this.wheelEvent = fromEvent(this.element.nativeElement, 'wheel');
        this.scrolledDown = this.scrollEvent
            .pipe(
                map(e => ({
                    scrollHeight: e.target.scrollHeight,
                    scrollTop: e.target.scrollTop,
                    clientHeight: e.target.clientHeight
                })),
                pairwise(),
                filter(
                    ([oldPosition, newPosition]) =>
                        this.isScrollingDown(oldPosition, newPosition) &&
                        this.isScrollToBottom(newPosition)
                )
            )
            .subscribe(() => {
                if (this.scrollCallback) {
                    this.scrollCallback();
                }
                this.isOnBottom = true;
            });

        this.scrollingDown = this.scrollEvent
            .pipe(
                map(e => ({
                    scrollHeight: e.target.scrollHeight,
                    scrollTop: e.target.scrollTop,
                    clientHeight: e.target.clientHeight
                })),
                startWith({
                    scrollHeight: this.element.nativeElement.scrollHeight,
                    scrollTop: this.element.nativeElement.scrollTop,
                    clientHeight: this.element.nativeElement.clientHeight
                }),
                pairwise(),
                filter(([oldPosition, newPosition]) =>
                    this.isScrollingDown(oldPosition, newPosition)
                )
            )
            .subscribe(() => {
                this.isOnTop = false;
            });

        this.scrollingUp = this.scrollEvent
            .pipe(
                map(e => ({
                    scrollHeight: e.target.scrollHeight,
                    scrollTop: e.target.scrollTop,
                    clientHeight: e.target.clientHeight
                })),
                startWith({
                    scrollHeight: this.element.nativeElement.scrollHeight,
                    scrollTop: this.element.nativeElement.scrollTop,
                    clientHeight: this.element.nativeElement.clientHeight
                }),
                pairwise(),
                filter(([oldPosition, newPosition]) =>
                    this.isScrollingUp(oldPosition, newPosition)
                )
            )
            .subscribe(() => {
                this.isOnBottom = false;
            });

        this.scrolledUp = this.scrollEvent
            .pipe(
                map(e => ({
                    scrollHeight: e.target.scrollHeight,
                    scrollTop: e.target.scrollTop,
                    clientHeight: e.target.clientHeight
                })),
                pairwise(),
                filter(([, newPosition]) => this.isScrollToTop(newPosition))
            )
            .subscribe(() => {
                this.upCounter = 0;
                this.isOnTop = true;
            });

        this.wheeledUp = this.wheelEvent.subscribe(event => {
            if (event.deltaY < 0 && this.isOnTop === true && this.checkLog) {
                this.upCounter = this.upCounter + 1;
            }
            if (
                this.upCounter > 20 &&
                this.isOnTop === true &&
                this.wheelUpCallback
            ) {
                this.wheelUpCallback();
                this.upCounter = 0;
            }
        });

        this.wheeledDown = this.wheelEvent.subscribe(event => {
            if (event.deltaY > 0 && this.isOnBottom) {
                this.downCounter++;
            }
            if (
                this.downCounter > 20 &&
                this.isOnBottom &&
                this.wheeledDownCallback
            ) {
                this.wheeledDownCallback();
                this.downCounter = 0;
            }
        });
    }

    ngOnDestroy() {
        if (this.scrolledDown) {
            this.scrolledDown.unsubscribe();
        }
    }

    isScrollingDown = (oldPosition: any, newPosition: any) =>
        oldPosition.scrollTop < newPosition.scrollTop;

    isScrollToTop = (position: any) => position.scrollTop === 0;

    isScrollToBottom = (position: any) =>
        position.scrollHeight - position.scrollTop === position.clientHeight;

    isScrollingUp = (oldPosition: any, newPosition: any) =>
        oldPosition.scrollTop > newPosition.scrollTop;
}

@NgModule({
    declarations: [ScrollDirective],
    exports: [ScrollDirective]
})
export class KitScrollModule {}
