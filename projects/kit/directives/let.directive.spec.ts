import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LetDirective, LetDirectiveContext } from '@dagility-ui/kit';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <ng-template [libLet]="[1, 2, 3]"></ng-template>
    `,
    standalone: false
})
class TestComponent {}

describe('LetDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let letDirectiveContext: LetDirectiveContext<any>;
    let letDirective: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestComponent, LetDirective]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        letDirective = fixture.debugElement.queryAll(
            By.directive(LetDirective)
        );
        letDirectiveContext = new LetDirectiveContext<any>({} as any);
    });

    it('should have letDirective', () => {
        expect(letDirective).not.toBeNull();
    });

    it('ngTemplateContextGuard should return true', () => {
        spyOn(LetDirective, 'ngTemplateContextGuard').and.callThrough();
        expect(LetDirective.ngTemplateContextGuard({} as any, {})).toBeTrue();
    });
});

describe('LetDirectiveContext', () => {
    let letDirectiveContext: LetDirectiveContext<any>;

    beforeEach(() => {
        letDirectiveContext = new LetDirectiveContext<any>({} as any);
        letDirectiveContext['dir'].context = true;
    });

    it('should be created', () => {
        expect(letDirectiveContext).toBeTruthy();
    });

    it('$implicit should return true', () => {
        expect(letDirectiveContext.$implicit).toBeTrue();
    });

    it('libLet should return true', () => {
        expect(letDirectiveContext.libLet).toBeTrue();
    });
});
