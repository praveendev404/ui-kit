import '@angular/localize/init';
import { DatepickerRangeNavigationComponent } from './datepicker-range-navigation.component';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';

describe('DatepickerRangeNavigationComponent', () => {
    let component: DatepickerRangeNavigationComponent;
    let fixture: ComponentFixture<DatepickerRangeNavigationComponent>;
    let event: any;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [NgbDatepickerModule],
                declarations: [DatepickerRangeNavigationComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(DatepickerRangeNavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        event = { currentTarget: { focus: () => {} } };
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('onClickPrev should call navigate emit', () => {
        spyOn(component.navigate, 'emit').and.callThrough();
        component.onClickPrev(event);
        expect(component.navigate.emit).toHaveBeenCalled();
    });

    it('onClickNext should call navigate emit', () => {
        spyOn(component.navigate, 'emit').and.callThrough();
        component.onClickNext(event);
        expect(component.navigate.emit).toHaveBeenCalled();
    });
});
