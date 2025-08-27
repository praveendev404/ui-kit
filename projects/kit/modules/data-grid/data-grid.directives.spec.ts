import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    HeaderTemplateDirective,
    RowTemplateDirective
} from '@dagility-ui/kit';
import { Component, CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    template: `
        <lib-data-grid>
            <ng-template rowTemplate></ng-template>
            <ng-template headerTemplate></ng-template>
        </lib-data-grid>
    `,
    standalone: false
})
class TestComponent {}

describe('DataGrid Directives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let rowHeader: DebugElement[];
    let headerTemplate: DebugElement[];

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [
                    TestComponent,
                    RowTemplateDirective,
                    HeaderTemplateDirective
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        rowHeader = fixture.debugElement.queryAll(
            By.directive(RowTemplateDirective)
        );
        headerTemplate = fixture.debugElement.queryAll(
            By.directive(HeaderTemplateDirective)
        );
    });

    it('should have rowHeader', () => {
        expect(rowHeader).not.toBeNull();
    });

    it('should have headerTemplate', () => {
        expect(headerTemplate).not.toBeNull();
    });
});
