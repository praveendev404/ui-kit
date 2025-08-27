import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ModalWarningComponent } from './modal-warning.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('modal-warning', () => {
    let component: ModalWarningComponent;
    let fixture: ComponentFixture<ModalWarningComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ModalWarningComponent],
            providers: [NgbActiveModal],
        }).compileComponents();
        fixture = TestBed.createComponent(ModalWarningComponent);
        component = fixture.componentInstance;
        component.message = {
            title: 'string',
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('confirm method should be called', fakeAsync(async () => {
        spyOn(component.confirmOk, 'emit');
        spyOn(component.modal, 'close');
        const confirmButton = fixture.debugElement.nativeElement.querySelector('[test-id="confirmButton"]');
        confirmButton.click();
        tick();
        expect(component.confirmOk.emit).toHaveBeenCalledWith(true);
        expect(component.modal.close).toHaveBeenCalled();
    }));

    it('cancel method should be called', fakeAsync(async () => {
        spyOn(component.cancelBtnClicked, 'emit');
        spyOn(component.modal, 'dismiss');
        const cancelButton = fixture.debugElement.nativeElement.querySelector('[test-id="cancelButton"]');
        cancelButton.click();
        tick();
        expect(component.cancelBtnClicked.emit).toHaveBeenCalled();
        expect(component.modal.dismiss).toHaveBeenCalled();
    }));

    it('should display image', () => {
        component.message = {
            title: 'string',
            image: 'assets/images/dagilityLogoLight.svg',
        };
        fixture.detectChanges();

        const imageElement = fixture.debugElement.nativeElement.querySelector('[test-id="image-container-with-image"]');

        expect(imageElement).not.toBeNull();
    });

    it('should display icon', () => {
        component.message = {
            title: 'string',
            image: 'facBuildSuccess',
        };
        fixture.detectChanges();

        const imageElement = fixture.debugElement.nativeElement.querySelector('[test-id="image-container-with-icon"]');

        expect(imageElement).not.toBeNull();
    });
});
