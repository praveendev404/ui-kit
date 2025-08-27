import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ToastrBodyTemplateDirective, ToastrComponent, ToastrFooterTemplateDirective} from '@dagility-ui/kit';
import {By} from '@angular/platform-browser';

@Component({
    template: `
        <lib-toastr
            [toastrType]="'toastr-error'"
            [title]="'Title'"
            [message]="'Message'"
            [htmlBodyContent]="false"
            [closeButton]="true"
            [onCloseFunction]="onClose"
        >
            <ng-template bodyTemplate></ng-template>
            <ng-template footerTemplate></ng-template>
        </lib-toastr>`,
    standalone: false
})
class TestComponent {
    onClose = () => {};
}

describe('ToastrDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let bodyTemplate: DebugElement[];
    let footerTemplate: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                ToastrComponent,
                ToastrBodyTemplateDirective,
                ToastrFooterTemplateDirective
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        bodyTemplate = fixture.debugElement.queryAll(By.directive(ToastrBodyTemplateDirective));
        footerTemplate = fixture.debugElement.queryAll(By.directive(ToastrFooterTemplateDirective));
    });

    it('should have bodyTemplate', () => {
        expect(bodyTemplate).not.toBeNull();
    });

    it('should have footerTemplate', () => {
        expect(footerTemplate).not.toBeNull();
    });
});
