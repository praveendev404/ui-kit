import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalConfirmComponent } from './modal-confirm.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalHeaderComponent } from '../modal-header/modal-header.component';

describe('ModalConfirmComponent', () => {
    let component: ModalConfirmComponent;
    let fixture: ComponentFixture<ModalConfirmComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ModalConfirmComponent, ModalHeaderComponent],
            providers: [NgbActiveModal]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalConfirmComponent);
        component = fixture.componentInstance;
        component.message = {
            title: 'string',
            content: 'string',
            type: 'string'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('confirm method should be called', () => {
        spyOn(component.confirmOk, 'emit');
        spyOn(component.modal, 'close');
        component.confirm();
        expect(component.confirmOk.emit).toHaveBeenCalledWith(true);
        expect(component.modal.close).toHaveBeenCalled();
    });

    it('confirmAdditional method should be called', () => {
        spyOn(component.additionalBtnClicked, 'emit');
        spyOn(component.modal, 'close');
        component.confirmAdditional();
        expect(component.additionalBtnClicked.emit).toHaveBeenCalledWith(true);
        expect(component.modal.close).toHaveBeenCalled();
    });

    it('cancel method should be called', () => {
        spyOn(component.cancelBtnClicked, 'emit');
        spyOn(component.modal, 'dismiss');
        component.cancel();
        expect(component.cancelBtnClicked.emit).toHaveBeenCalled();
        expect(component.modal.dismiss).toHaveBeenCalled();
    });
});
