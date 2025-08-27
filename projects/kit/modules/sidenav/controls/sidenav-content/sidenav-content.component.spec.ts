import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SidenavContainerComponent, SidenavContentComponent } from '@dagility-ui/kit';

describe('SidenavContentComponent', () => {
    let component: SidenavContentComponent;
    let fixture: ComponentFixture<SidenavContentComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavContentComponent],
            providers: [SidenavContainerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
