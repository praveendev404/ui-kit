import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { NgZone } from '@angular/core';
import { OnChanges } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';

enum Direction {
    UP = 'up',
    DOWN = 'down',
    NONE = 'none'
}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[stopScrollPropagation]',
    inputs: ['stopScrollPropagation', 'stopKeyScroll'],
    standalone: false
})
export class StopScrollPropagationDirective implements OnInit, OnChanges, OnDestroy {
    public stopScrollPropagation: boolean | string;
    public stopKeyScroll: boolean | string;

    private readonly element: HTMLElement;
    private zone: NgZone;

    private static getDirectionFromKeyboardEvent(
        event: KeyboardEvent
    ): Direction {
        switch (event.key) {
            case ' ':
                return event.shiftKey ? Direction.UP : Direction.DOWN;
            case 'ArrowUp':
            case 'Home':
            case 'PageUp':
                return Direction.UP;
            case 'ArrowDown':
            case 'End':
            case 'PageDown':
                return Direction.DOWN;
            default:
                return Direction.NONE;
        }
    }

    private static getDirectionFromWheelEvent(event: WheelEvent): Direction {
        const delta = event.deltaY || event.detail;

        return delta <= 0 ? Direction.UP : Direction.DOWN;
    }

    private static getDirectionFromEvent(
        event: WheelEvent | KeyboardEvent
    ): Direction {
        if (event instanceof WheelEvent) {
            return StopScrollPropagationDirective.getDirectionFromWheelEvent(event);
        } else {
            return StopScrollPropagationDirective.getDirectionFromKeyboardEvent(event);
        }
    }

    private static isFormElement(element: HTMLElement): boolean {
        return (
            element.tagName === 'TEXTAREA' ||
            element.tagName === 'INPUT' ||
            element.tagName === 'SELECT'
        );
    }

    private static isScrollableElement(element: HTMLElement): boolean {
        if (getComputedStyle(element).overflowY === 'hidden') {
            return false;
        }

        return element.scrollHeight !== element.clientHeight;
    }

    private static isScrolledToTheBottom(element: HTMLElement): boolean {
        return element.clientHeight + element.scrollTop >= element.scrollHeight;
    }

    private static isScrolledToTheTop(element: HTMLElement): boolean {
        return !element.scrollTop;
    }

    private static isScrolledInMaxDirection(
        element: HTMLElement,
        direction: Direction
    ): boolean {
        return (
            (direction === Direction.UP &&
                StopScrollPropagationDirective.isScrolledToTheTop(element)) ||
            (direction === Direction.DOWN &&
                StopScrollPropagationDirective.isScrolledToTheBottom(element))
        );
    }

    private static normalizeInputAsBoolean(value: any): boolean {
        return value === '' || !!value;
    }

    constructor(elementRef: ElementRef, zone: NgZone) {
        this.element = elementRef.nativeElement;
        this.zone = zone;
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.stopScrollPropagation = StopScrollPropagationDirective.normalizeInputAsBoolean(
            this.stopScrollPropagation
        );
        this.stopKeyScroll = StopScrollPropagationDirective.normalizeInputAsBoolean(
            this.stopKeyScroll
        );

        if ('stopKeyScroll' in changes) {
            if (this.stopKeyScroll) {
                this.element.tabIndex = -1; // Focus without tab-based navigation.
            } else {
                this.element.removeAttribute('tabIndex');
            }
        }
    }

    ngOnInit(): void {
        this.zone.runOutsideAngular((): void => {
            this.element.addEventListener('wheel', this.handleEvent, false);
            this.element.addEventListener('keydown', this.handleEvent, false);
        });
    }

    private eventShouldBePrevented(event: WheelEvent | KeyboardEvent): boolean {
        let target = <HTMLElement>event.target;
        const direction = StopScrollPropagationDirective.getDirectionFromEvent(event);

        while (target !== this.element) {
            if (
                StopScrollPropagationDirective.isScrollableElement(target) &&
                !StopScrollPropagationDirective.isScrolledInMaxDirection(target, direction)
            ) {
                return false;
            }

            target = <HTMLElement>target.parentNode;
        }
        return StopScrollPropagationDirective.isScrolledInMaxDirection(target, direction);
    }

    private handleEvent = (event: WheelEvent | KeyboardEvent): void => {
        if (!this.isTrappingEvent(event)) {
            return;
        }

        event.stopPropagation();
        if (this.eventShouldBePrevented(event)) {
            event.preventDefault();
        }
    };

    private isTrappingEvent(event: WheelEvent | KeyboardEvent): boolean {
        if (!this.stopScrollPropagation) {
            return false;
        }

        if (event instanceof KeyboardEvent) {
            if (!this.stopKeyScroll) {
                return false;
            }

            const target = <HTMLElement>event.target;
            if (
                event instanceof KeyboardEvent &&
                StopScrollPropagationDirective.isFormElement(target)
            ) {
                return false;
            }

            if (
                StopScrollPropagationDirective.getDirectionFromKeyboardEvent(event) ===
                Direction.NONE
            ) {
                return false;
            }
        }

        return true;
    }

    ngOnDestroy(): void {
        this.element.removeEventListener('wheel', this.handleEvent, false);
        this.element.removeEventListener('keydown', this.handleEvent, false);
    }
}
