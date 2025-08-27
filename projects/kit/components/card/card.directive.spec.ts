import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    CardComponent,
    CardFooterTemplateDirective,
    CardHeaderTemplateDirective
} from '@dagility-ui/kit';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <lib-card>
            <ng-template headerTemplate></ng-template>
            <ng-template footerTemplate></ng-template>
        </lib-card>
    `,
    standalone: false
})
class TestComponent {}

describe('CardDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let headerTemplate: DebugElement[];
    let footerTemplate: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    CardComponent,
                    CardHeaderTemplateDirective,
                    CardFooterTemplateDirective
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        headerTemplate = fixture.debugElement.queryAll(
            By.directive(CardHeaderTemplateDirective)
        );
        footerTemplate = fixture.debugElement.queryAll(
            By.directive(CardFooterTemplateDirective)
        );
    });

    it('should have headerTemplate', () => {
        expect(headerTemplate).not.toBeNull();
    });

    it('should have footerTemplate', () => {
        expect(footerTemplate).not.toBeNull();
    });
});
