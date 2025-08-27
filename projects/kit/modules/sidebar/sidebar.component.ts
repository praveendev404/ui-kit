import {
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    model,
} from '@angular/core';

@Component({
    selector: 'lib-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    host: {
        '[class.collapsed]': '!expanded()',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SidebarComponent {
    expanded = model(true);

    tooltipText = computed(() => {
        return `Click to ${this.expanded() ? 'collapse' : 'expand'}`;
    });

    private element = inject<ElementRef<HTMLElement>>(ElementRef);

    constructor() {
        setTimeout(() => {
            this.element.nativeElement.classList.add('sidebar-transition');
        }, 200);
    }
}
