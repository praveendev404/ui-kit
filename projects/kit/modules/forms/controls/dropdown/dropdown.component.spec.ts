import {
    ComponentFixture,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync
} from '@angular/core/testing';
import { DropdownComponent } from '@dagility-ui/kit';
import { ElementRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import createSpyObj = jasmine.createSpyObj;
import { By } from '@angular/platform-browser';
import {getAllByTestId, getByTestId} from '../../../../test-helpers';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    const ngSelectComponent = createSpyObj('NgSelectComponent', [
        '_setSearchTermFromItems',
        '_cd'
    ]);

    let value: { key: string; value: string };
    let array: { key: string; value: string }[];

    function setupSelectControl() {
        const el = document.createElement('div'),
            subEl = document.createElement('div');

        subEl.classList.add('ng-value-container');
        el.append(subEl);
        component.selectControlEl = new ElementRef<HTMLElement>(el);
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DropdownComponent],
                imports: [NgSelectModule],
                schemas: [NO_ERRORS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DropdownComponent);
        component = fixture.componentInstance;
    });

    describe('common scenarios', () => {
        beforeEach(() => {
            value = { key: 'key', value: 'value' };
            array = [{ ...value }];

            component.value = { ...value };
            component.labelKey = 'key';
            component.valueKey = 'value';
            component.items = array;

            fixture.detectChanges();
        });

        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('disabled should be called', () => {
            spyOn(component, 'setDisabledState').and.callThrough();
            component.setDisable = true;

            expect(component.setDisabledState).toHaveBeenCalledWith(true);
        });

        it('writeValue should be called', () => {
            spyOn(component, 'writeValue').and.callThrough();

            component.writeValue(value);
            expect(component.writeValue).toHaveBeenCalledWith(value);
        });

        it('writeValue should be called with array', () => {
            spyOn(component, 'writeValue').and.callThrough();

            component.writeValue(array);
            expect(component.writeValue).toHaveBeenCalledWith(array);
        });

        it('writeValue should be called and emit setTimeout', () => {
            ngSelectComponent['_cd'].markForCheck = () => {};
            component.editableSearchTerm = true;
            component.ngSelect = ngSelectComponent;

            spyOn(component, 'writeValue').and.callThrough();
            component.writeValue(value);

            expect(component.writeValue).toHaveBeenCalledWith(value);
        });

        it('ngOnInit should be called with value = arr', fakeAsync(() => {
            component.value = array;
            component.addTag = true;
            component.typeahead$.next('someValue');

            spyOn(component, 'ngOnInit').and.callThrough();
            component.ngOnInit();
            tick(500);

            expect(component.ngOnInit).toHaveBeenCalled();
        }));

        it('ngOnInit should be called with empty typehead$', fakeAsync(() => {
            component.typeahead$.next(undefined);
            spyOn(component, 'ngOnInit').and.callThrough();
            component.ngOnInit();
            tick(500);

            expect(component.ngOnInit).toHaveBeenCalled();
        }));

        it('onSelect should be called with ngControl and selected not equal param', () => {
            (component as any).ngControl = true;
            component.multiple = true;
            spyOn(component, 'onSelect').and.callThrough();
            component.onSelect(array);

            expect(component.onSelect).toHaveBeenCalled();
        });

        it('onSelect should be called with ngControl and selected equals param', () => {
            (component as any).ngControl = true;
            spyOn(component, 'onSelect').and.callThrough();
            component.onSelect({});

            expect(component.onSelect).toHaveBeenCalled();
        });

        it('onSelect should be called without ngControl', () => {
            spyOn(component, 'onSelect').and.callThrough();
            component.onSelect({});

            expect(component.onSelect).toHaveBeenCalled();
        });

        it('handleChange should be call change emit with true with setTimeout', () => {
            setupSelectControl();

            spyOn(component.change, 'emit').and.callThrough();
            spyOn<any>(
                component.selectControlEl.nativeElement,
                'querySelector'
            ).and.returnValue({
                offsetWidth: 1,
                scrollWidth: 10,
                children: [
                    { textContent: 'someValue' },
                    { textContent: 'someValue' }
                ]
            });

            component.handleChange(true);

            expect(component.change.emit).toHaveBeenCalledWith(true);
        });

        it('handleChange should be call change emit with true without setTimeout', () => {
            setupSelectControl();

            spyOn(component.change, 'emit').and.callThrough();
            spyOn<any>(
                component.selectControlEl.nativeElement,
                'querySelector'
            ).and.returnValue({
                offsetWidth: 10,
                scrollWidth: 1,
                children: [
                    { textContent: 'someValue' },
                    { textContent: 'someValue' }
                ]
            });

            component.handleChange(true);

            expect(component.change.emit).toHaveBeenCalledWith(true);
        });

        it('handleChange should be call change emit with true without selectContainer', () => {
            setupSelectControl();

            spyOn(component.change, 'emit').and.callThrough();
            spyOn<any>(
                component.selectControlEl.nativeElement,
                'querySelector'
            ).and.returnValue(null);

            component.handleChange(true);

            expect(component.change.emit).toHaveBeenCalledWith(true);
        });

        it('handleChange should be call change emit with true without truncate', () => {
            spyOn(component.change, 'emit').and.callThrough();
            component.truncate = false;
            component.handleChange(true);

            expect(component.change.emit).toHaveBeenCalledWith(true);
        });

        it('handleNavigate should call navigate emit with value', () => {
            spyOn(component.navigate, 'emit').and.callThrough();
            component.handleNavigate(0);
            expect(component.navigate.emit).toHaveBeenCalledWith(0);
        });

        it('handleAdd should call add emit with value', () => {
            spyOn(component.add, 'emit').and.callThrough();
            component.handleAdd({});
            expect(component.add.emit).toHaveBeenCalledWith({});
        });

        it('handleRemove should call remove emit with value', () => {
            spyOn(component.remove, 'emit').and.callThrough();
            component.handleRemove({});
            expect(component.remove.emit).toHaveBeenCalledWith({});
        });

        it('addAll should be called', () => {
            spyOn(component, 'addAll').and.callThrough();
            (component as any).ngControl = { control: { setValue: () => {} } };
            spyOn(component.ngControl.control, 'setValue').and.callThrough();
            component.addAll();
            expect(component.addAll).toHaveBeenCalled();
        });

        it('removeAll should be called', () => {
            spyOn(component, 'removeAll').and.callThrough();
            (component as any).ngControl = { control: { setValue: () => {} } };
            spyOn(component.ngControl.control, 'setValue').and.callThrough();
            component.removeAll();
            expect(component.removeAll).toHaveBeenCalled();
        });

        it('invertAll should be called', () => {
            component.value = array;
            spyOn(component, 'invertAll').and.callThrough();
            (component as any).ngControl = { control: { setValue: () => {} } };
            spyOn(component.ngControl.control, 'setValue').and.callThrough();
            component.invertAll();
            expect(component.invertAll).toHaveBeenCalled();
        });

        it('verify selecting "All/None/Inv"', () => {
            component.multiple = true;
            component.items = [
                { label: 'Label1', value: 'value1'},
                { label: 'Label2', value: 'value2'},
                { label: 'Label3', value: 'value3'},
            ];
            component.value = ['value1', 'value2'];
            fixture.detectChanges();
            const selectElement = fixture.debugElement.query(
                By.css('ng-select .ng-select-container')
            );

            selectElement.nativeElement.dispatchEvent(new Event('mousedown'));
            fixture.detectChanges();

            spyOn(component, 'addAll').and.callThrough();
            spyOn(component, 'invertAll').and.callThrough();
            spyOn(component, 'removeAll').and.callThrough();

            const invertAllBtn = getByTestId(fixture, 'invert-all-btn');
            invertAllBtn.nativeElement.click();
            expect(component.invertAll).toHaveBeenCalled();
            expect(component.value).toEqual(['value3']);


            const addAllBtn = getByTestId(fixture, 'add-all-btn');
            addAllBtn.nativeElement.click();
            expect(component.addAll).toHaveBeenCalled();
            expect(component.value).toEqual(['value1', 'value2', 'value3']);

            const removeAllBtn = getByTestId(fixture, 'remove-all-btn');
            removeAllBtn.nativeElement.click();
            expect(component.removeAll).toHaveBeenCalled();
            expect(component.value).toEqual([]);
        });

        it('onScroll should call scroll.emit', () => {
            spyOn(component.scroll, 'emit').and.callThrough();
            component.onScroll();
            expect(component.scroll.emit).toHaveBeenCalled();
        });

        it('onScroll should call scroll.emit with value', () => {
            spyOn(component.scroll, 'emit').and.callThrough();
            component.onScrollToEnd({});
            expect(component.scroll.emit).toHaveBeenCalledWith({});
        });

        it('onClose should be called', () => {
            component.validation = () => {};
            component._filterValue = 'someValue';

            spyOn(component.close, 'emit').and.callThrough();
            component.onClose();

            expect(component.close.emit).toHaveBeenCalledWith(value);
        });

        it('onClose should be called', () => {
            spyOn(component.close, 'emit').and.callThrough();
            component.onClose();

            expect(component.close.emit).toHaveBeenCalledWith(value);
        });

        it('addTagFnImpl should be returned null', () => {
            spyOn(component, 'addTagFnImpl').and.callThrough();
            expect(component.addTagFnImpl('value')).toBeNull();
        });

        it('addTagFnImpl should be returned result', () => {
            spyOn(component, 'addTagFnImpl').and.callThrough();
            expect(component.addTagFnImpl('anotherValue')).not.toBe([value]);
        });
    });

    describe('group', () => {
        beforeEach(() => {
            component.items = [
                { label: 'Apple', value: 'apple', group: 'fruit' },
                { label: 'Banana', value: 'banana', group: 'fruit' },
                { label: 'Orange', value: 'orange', group: 'fruit' },
                { label: 'Tomato', value: 'tomato', group: 'vegetable' },
                { label: 'Cucumber', value: 'cucumber', group: 'vegetable' }
            ];
            component.groupBy = 'group';
            component.multiple = true;
            component.appendTo = null;
            fixture.detectChanges();
            const selectElement = fixture.debugElement.query(
                By.css('ng-select .ng-select-container')
            );

            selectElement.nativeElement.dispatchEvent(new Event('mousedown'));
        });

        it('should render selection actions All/None/Invert for each section in grouped dropdown with multiple selection', () => {
            const groupTitles = getAllByTestId(fixture, 'group-title');
            expect(groupTitles.length).toBe(2);
            expect(groupTitles[0].nativeElement.textContent).toContain('Fruit');
            expect(groupTitles[1].nativeElement.textContent).toContain('Vegetable');

            groupTitles.forEach(group => {
                expect(group.nativeElement.nextElementSibling.textContent).toContain('Select AllNoneInvert');
            });
        });

        it('should select and deselect group', () => {
            spyOn(component, 'addGroup').and.callThrough();
            spyOn(component, 'removeGroup').and.callThrough();
            const selectGroupBtn = getByTestId(fixture, 'add-group-btn');
            selectGroupBtn.nativeElement.click();
            expect(component.addGroup).toHaveBeenCalledWith('fruit');
            expect(component.value).toEqual(['apple', 'banana', 'orange']);

            const deSelectGroupBtn = getByTestId(fixture, 'remove-group-btn');
            deSelectGroupBtn.nativeElement.click();
            expect(component.removeGroup).toHaveBeenCalledWith('fruit');
            expect(component.value).toEqual([]);
        });


        it('should invert group', () => {
            spyOn(component, 'invertAllInGroup').and.callThrough();
            component.value = ['tomato'];
            const invertGroupBtn = getByTestId(fixture, 'invert-group-btn');
            invertGroupBtn.nativeElement.click();
            expect(component.invertAllInGroup).toHaveBeenCalledWith('fruit');
            expect(component.value).toEqual(['apple', 'banana', 'orange', 'tomato']);

            invertGroupBtn.nativeElement.click();
            expect(component.value).toEqual(['tomato']);
        });
    });
});
