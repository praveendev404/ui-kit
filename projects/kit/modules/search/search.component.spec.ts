import {ComponentFixture, fakeAsync, TestBed, tick, waitForAsync} from '@angular/core/testing';
import {SearchComponent} from './search.component';
import {SearchModule} from './search.module';
import {IconsModule} from '../../../demo/src/app/components/icons/icons.module';
import {NG_VALUE_ACCESSOR} from '@angular/forms';
import {of} from 'rxjs';

describe('SearchComponent', () => {
    let component: SearchComponent;
    let fixture: ComponentFixture<SearchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [SearchModule, IconsModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SearchComponent);
        component = fixture.componentInstance;
        component.width = 100;
        component.searchTermLength = 3;
        fixture.debugElement.injector.get(NG_VALUE_ACCESSOR);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onKeyUp method should be called and enterPressed should be emitted', () => {
        spyOn(component, 'onKeyUp').and.callThrough();
        spyOn(component.enterPressed, 'emit');
        component.onKeyUp({code: 'Enter', target: {}});
        expect(component.enterPressed.emit).toHaveBeenCalled();
    });


    it('search should be called', fakeAsync(() => {
        const handler = new Function();

        spyOn(component, 'search').and.callThrough();
        component.search(of('term')).subscribe(data => {
            expect(data).not.toBeNull();
        });
        expect(component.search).toHaveBeenCalled();

        component.registerOnTouched(handler);
        component.registerOnChange(handler);
        component.search(of('')).subscribe(data => {
            expect(data).toEqual([]);
        });
    }));

    it('writeValue should be called and define value', () => {
        spyOn(component, 'writeValue').and.callThrough();
        component.writeValue('test');
        expect(component.writeValue).toHaveBeenCalled();
        expect(component.value).toBe('test');
    });

    it('setDisabledState should be called and define disabled', () => {
        spyOn(component, 'setDisabledState').and.callThrough();
        component.setDisabledState(true);
        expect(component.setDisabledState).toHaveBeenCalled();
        expect(component.disabled).toBeTruthy();
    });

    it('setFocusWidthWithHover should be called and define width', () => {
        spyOn(component, 'setFocusWidthWithHover').and.callThrough();
        component.isFocused = true;
        component.setFocusWidthWithHover(true);
        expect(component.setFocusWidthWithHover).toHaveBeenCalled();
        component.setFocusWidthWithHover(false);
        expect(component.width).not.toBeNaN();
    });
});
