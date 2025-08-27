import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ButtonWithLoaderComponent } from '@dagility-ui/kit';

describe('ButtonWithLoaderComponent', () => {
    let component: ButtonWithLoaderComponent;
    let fixture: ComponentFixture<ButtonWithLoaderComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonWithLoaderComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonWithLoaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
