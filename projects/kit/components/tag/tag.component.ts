import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    HostBinding
} from '@angular/core';

@Component({
    selector: 'lib-tag, a[libTag]',
    templateUrl: './tag.component.html',
    styleUrls: ['./tag.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class TagComponent {
    @Input() tag: string;

    @HostBinding('class.hoverable')
    @Input()
    hoverable = false;

    @HostBinding('class.removable')
    @Input()
    removable = false;

    @Output() remove = new EventEmitter<void>();

    @HostBinding('class.hoverable')
    isLink = false;

    constructor(elementRef: ElementRef<HTMLElement>) {
        this.isLink = elementRef.nativeElement instanceof HTMLAnchorElement;
    }

    handleRemove(event: MouseEvent) {
        event.preventDefault();
        event.stopPropagation();

        this.remove.emit();
    }
}
