import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
    useWaitingModal,
    WaitingModalComponent
} from './waiting-modal.component';
import { ChangeDetectorRef } from '@angular/core';
import { ModalService } from '@dagility-ui/kit';

describe('WaitingModalComponent', () => {
    let component: WaitingModalComponent;
    let fixture: ComponentFixture<WaitingModalComponent>;
    let waitingModal: ReturnType<typeof useWaitingModal>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WaitingModalComponent],
            providers: [
                {
                    provide: ModalService,
                    useValue: { open: jasmine.createSpy() }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(WaitingModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        TestBed.runInInjectionContext(() => {
            waitingModal = useWaitingModal();
        });
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show loader component', () => {
        expect(fixture.debugElement.query(By.css('.loader'))).toBeTruthy();
    });

    it('should show loading text', () => {
        fixture.componentInstance.text = 'loading';
        fixture.debugElement.injector.get(ChangeDetectorRef).detectChanges();
        expect(
            fixture.debugElement.query(By.css(`[data-test-id="loading-text"]`))
                .nativeElement.textContent
        ).toBe('loading');
    });

    it('should open loader modal', () => {
        waitingModal.open('Text...');
        expect(TestBed.inject(ModalService).open).toHaveBeenCalledOnceWith(
            WaitingModalComponent,
            jasmine.anything(),
            {
                text: 'Text...'
            }
        );
    });
});
