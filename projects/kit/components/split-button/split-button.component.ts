import {
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { CustomIcon } from '@dagility-ui/kit/icons';

export interface SplitButtonItem {
    disabled: boolean;
    label: string;
}
@Component({
    selector: 'lib-split-button',
    templateUrl: './split-button.component.html',
    styleUrls: ['./split-button.component.scss'],
    standalone: false
})
export class SplitButtonComponent<T extends SplitButtonItem>
    implements OnInit, OnDestroy {
    @Input() placement = 'bottom-right';
    @Input() buttonText: string;
    @Input() buttonIcon: string | CustomIcon;
    @Input() items: T[];
    @Input() disabled: boolean;
    @Input() dropdownMode: boolean;
    @Input() isPrimary = true;
    @Input() isLink = false;
    @Input() isIcon: boolean = false;
    @Input() container: 'body' | null = null;

    @Output() itemClick = new EventEmitter<T>();

    @ContentChild(TemplateRef, { static: true }) itemTemplate: TemplateRef<
        ElementRef
    >;

    @ViewChild('containerEl', { static: true }) containerEl: ElementRef;

    private parentElements: Element[] = [];
    private scrollFn: any;

    sizeS = false;
    sizeL = false;

    ngOnInit() {
        const hostNativeElement = this.containerEl.nativeElement
            .parentNode as Element;
        this.sizeS = hostNativeElement.classList.contains('size-s');
        this.sizeL = hostNativeElement.classList.contains('size-l');
    }

    addParentsEventListener(element: Element, dropdown: NgbDropdown) {
        this.scrollFn = () => {
            dropdown.close();
            this.removeParentsEventListener();
        };
        this.parentElements = [];
        let parentElement = element.parentElement;
        do {
            this.parentElements.push(parentElement);
            parentElement.addEventListener('scroll', this.scrollFn);
            parentElement = parentElement.parentElement;
        } while (parentElement);
    }

    removeParentsEventListener() {
        this.parentElements.forEach(element => {
            element.removeEventListener('scroll', this.scrollFn);
        });
    }

    handleOpen(element: Element, dropdown: NgbDropdown) {
        dropdown.isOpen()
            ? this.addParentsEventListener(element, dropdown)
            : this.removeParentsEventListener();
    }

    handleClick(item: T) {
        if (item.disabled) {
            return;
        }

        this.itemClick.emit(item);
    }

    ngOnDestroy() {
        this.removeParentsEventListener();
    }
}
