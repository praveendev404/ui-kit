import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FaCustomIconDirective } from './fa-custom-icon.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
// import * as fontAwesome from '@fortawesome/fontawesome-svg-core';

@Component({
    template: `
        <fa-icon icon="calendar"></fa-icon>
    `,
    standalone: false
})
class TestComponent {}

describe('FaCustomIconDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let faCustomIconDirective: DebugElement[];
    let testClass: FaCustomIconDirective;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FontAwesomeTestingModule],
                declarations: [TestComponent, FaCustomIconDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        faCustomIconDirective = fixture.debugElement.queryAll(
            By.directive(FaCustomIconDirective)
        );

        const param = {} as any;
        testClass = new FaCustomIconDirective(param, param, param, param);
    });

    it('should have faCustomIconDirective', () => {
        expect(faCustomIconDirective).not.toBeNull();
    });

    xit('renderIcon should be called (problem with fontAwesome.icon)', () => {
        // spyOn<any>(
        //     testClass['faIconComponent'],
        //     'renderIcon'
        // ).and.callThrough();
        // spyOnProperty(fontAwesome, 'icon').and.returnValue({});
        //
        // testClass.customStyles = {};
        // testClass['faIconComponent']['renderIcon']();
        // expect(testClass['faIconComponent']['renderIcon']).toHaveBeenCalled();
    });

    it('ngOnChanges should be called', () => {
        spyOn(testClass, 'ngOnChanges').and.callThrough();
        testClass.icon = { customStyles: {} };
        testClass.ngOnChanges();
        expect(testClass.ngOnChanges).toHaveBeenCalled();
    });


    it('ngOnChanges should be called without icon', () => {
        spyOn(testClass, 'ngOnChanges').and.callThrough();
        testClass.icon = null;
        testClass.ngOnChanges();
        expect(testClass.ngOnChanges).toHaveBeenCalled();
    });
});
