import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ObsWithStatusPipe, SpinnerComponent, StreamWrapperComponent } from '@dagility-ui/kit';
import { throwError } from 'rxjs';

describe('StreamWrapperComponent', () => {
    let component: StreamWrapperComponent<any>;
    let fixture: ComponentFixture<StreamWrapperComponent<any>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [StreamWrapperComponent, ObsWithStatusPipe, SpinnerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(StreamWrapperComponent);
        component = fixture.componentInstance;
        component.dataStream$ = throwError('error');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component.obsWithReload$).toBeTruthy();
    });

    it('handleReload method should be called', () => {
        spyOn(component, 'handleReload').and.callThrough();
        spyOn(component.reload$, 'next').and.callThrough();
        component.handleReload();
        expect(component.reload$.next).toHaveBeenCalledWith(null);
    });
});
