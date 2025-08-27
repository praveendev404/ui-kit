import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    TemplateRef,
    EventEmitter,
    QueryList,
    ElementRef,
    ViewChildren,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

import {
    SidenavItem,
    SidenavItemFlatGroup,
    SidenavItemGroup
} from '../../types/sidenav-item';
import { SearchComponent } from '../../../search/search.component';
import { focusNativeElement } from '../../../../utils/utilities';

@Component({
    selector: 'lib-sidenav-group',
    templateUrl: './sidenav-group.component.html',
    styleUrls: ['./sidenav-group.component.scss'],
    host: { class: 'lib-sidenav-group' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SidenavGroupComponent implements OnDestroy {
    @Input() item: SidenavItemFlatGroup;

    @Input() menuTemplate: TemplateRef<any>;

    @Input() level: number;

    @Input() expanded: boolean;

    @Input() isHovered: boolean = false;

    @Output() expand = new EventEmitter();

    @ViewChildren(SearchComponent, { read: ElementRef })
    searchQuery: QueryList<ElementRef<HTMLElement>>;

    get filteredItems() {
        return this.filterItems(this.item?.items, this.value);
    }

    value = '';

    private subscription = Subscription.EMPTY;

    handleSearch(filter: string) {
        this.value = filter;
    }

    handleSearchClick() {
        this.expand.emit();

        this.subscription.unsubscribe();

        this.subscription = this.searchQuery.changes
            .pipe(
                take(1),
                map(
                    (search: QueryList<ElementRef<HTMLElement>>) => search.first
                ),
                map((elementRef) => elementRef.nativeElement),
                map((searchElement) =>
                    searchElement.querySelector<HTMLInputElement>(
                        `[type='search']`
                    )
                )
            )
            .subscribe(inputElement => {
                focusNativeElement(inputElement, true);
            });
    }

    // memoize!
    private filterItems(
        items: SidenavItemFlatGroup['items'],
        filter: string
    ): SidenavItemFlatGroup['items'] {
        const getItems = (
            result: Array<SidenavItem | SidenavItemGroup>,
            item: SidenavItem | SidenavItemGroup
        ) => {
            if (item.title?.toLowerCase().includes(filter.toLowerCase())) {
                result.push(item);

                return result;
            }
            if ('children' in item && item.children) {
                const subItems = item.children.reduce(getItems, []);

                if (subItems.length) {
                    result.push({
                        ...item,
                        items: subItems
                    } as SidenavItemGroup);
                }
            }

            return result;
        };

        return items?.reduce(getItems, []);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
