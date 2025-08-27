import {ToastrComponent} from '@dagility-ui/kit';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

describe('ToastrComponent', () => {
    let component: ToastrComponent;
    let fixture: ComponentFixture<ToastrComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ToastrComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToastrComponent);
        component = fixture.componentInstance;
        component.toastrType = 'toastr-error';
        component.message = 'Test message';
        component.title = 'Attention!';
        component.onCloseFunction = () => {
            component.title = 'test';
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.getMessage()).toBe('Test message');

        expect(component.messageIcon).toBe('facExclamationCircle');
        expect(component.toastType).toBe('error');
        expect(component.isNotification).toBeFalse();

        component.toastrType = 'toastr-info';
        expect(component.messageIcon).toBe('facExclamationCircle');
        expect(component.toastType).toBe('info');
        expect(component.isNotification).toBeFalse();

        component.toastrType = 'toastr-notification';
        expect(component.messageIcon).toBe('facExclamationCircle');
        expect(component.toastType).toBe('notification');
        expect(component.isNotification).toBeTrue();

        component.toastrType = 'toastr-warning';
        expect(component.messageIcon).toBe('exclamationTriangle');
        expect(component.toastType).toBe('warning');
        expect(component.isNotification).toBeFalse();

        component.toastrType = 'toastr-success';
        expect(component.messageIcon).toBe('check');
        expect(component.toastType).toBe('success');
        expect(component.isNotification).toBeFalse();

        component.onClose();
        expect(component.title).toBe('test');
    });
});
