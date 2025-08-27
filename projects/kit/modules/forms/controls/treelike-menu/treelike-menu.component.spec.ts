import {
    ComponentFixture,
    TestBed,
    fakeAsync,
    tick
} from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {
    TreeLikeMenuGroup,
    TreelikeMenuComponent
} from './treelike-menu.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

describe('TreelikeMenuComponent', () => {
    let component: TreelikeMenuComponent;
    let fixture: ComponentFixture<TreelikeMenuComponent>;

    const disabledItem = {
        label: 'disabledItem',
        actionHandler: jasmine.createSpy(),
        disabled: true
    };
    const enabledItem = {
        label: 'enabledItem',
        actionHandler: jasmine.createSpy(),
        disabled: false
    };
    const levelTwoNestedGroup = {
        label: 'testGroup21Lv2',
        items: [
            {
                label: 'testGroup21Lv2Item1',
                children: [
                    {
                        label: 'testGroup21Lv3',
                        items: [
                            {
                                label: 'testGroup21Lv3Item1',
                                actionHandler: () => {
                                    console.log('testGroup21Lv3Item1');
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    };

    const itemWithNesting = {
        label: 'testGroup1Lv1Item2',
        children: [levelTwoNestedGroup]
    };
    const customMenuItems: TreeLikeMenuGroup[] = [
        {
            label: 'testGroup1Lv1',
            items: [disabledItem, enabledItem, itemWithNesting]
        }
    ];

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NgbDropdownModule],
            declarations: [TreelikeMenuComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TreelikeMenuComponent);
        component = fixture.componentInstance;
        component.treeItems = customMenuItems;
        fixture.detectChanges();
        component.ngOnChanges({ treeItems: {}} as any);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    function openDropdownAngGetItems() {
        fixture.detectChanges();
        const toggleButton = fixture.debugElement.queryAll(
            By.css("[ngbDropdownToggle]")
        );
        toggleButton[0].nativeElement.click();

        tick();
        fixture.detectChanges();

        return fixture.debugElement.queryAll(By.css('[data-test-id="item"]'));
    }
    function getItemLabel(item: DebugElement) {
        return item.nativeElement.textContent
            ? item.nativeElement.textContent.replace(/\s/g, '')
            : '';
    }

    it('Item should not invoke action if item is disabled', fakeAsync(() => {
        const items = openDropdownAngGetItems();
        items
            .find(item => getItemLabel(item) === disabledItem.label)
            .nativeElement.click();

        tick();

        expect(disabledItem.actionHandler).not.toHaveBeenCalled();
    }));

    it('Item should invoke action if item is disabled', fakeAsync(() => {
        const items = openDropdownAngGetItems();
        items
            .find(item => getItemLabel(item) === enabledItem.label)
            .nativeElement.click();

        tick();

        expect(enabledItem.actionHandler).toHaveBeenCalled();
    }));

    it('Should should change active menu if item has children', fakeAsync(() => {
        const items = openDropdownAngGetItems();

        items
            .find(item => getItemLabel(item) === itemWithNesting.label)
            .nativeElement.click();

        tick();

        expect(component.currentTreeItems).toEqual([levelTwoNestedGroup]);
    }));

    it('Should go back one level when return button is pressed', fakeAsync(() => {
        const items = openDropdownAngGetItems();

        items
            .find(item => getItemLabel(item) === itemWithNesting.label)
            .nativeElement.click();

        tick();
        fixture.detectChanges();

        fixture.debugElement
            .query(By.css('[data-test-id="returnButton"]'))
            .nativeElement.click();

        tick();
        fixture.detectChanges();

        expect(component.currentTreeItems).toEqual(customMenuItems);
    }));
});
