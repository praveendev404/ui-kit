import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
    ObsWithStatusPipe,
    StreamWrapperComponent,
    StreamWrapperContentDirective,
    StreamWrapperLoaderDirective
} from '@dagility-ui/kit';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

@Component({
    template: `<lib-stream-wrapper [dataStream$]="dataStream$">
        <ng-template contentTemplate></ng-template>
        <ng-template loaderTemplate></ng-template>
    </lib-stream-wrapper>`,
    standalone: false
})
class TestComponent {
    dataStream$: Observable<any> = of({}).pipe();
}

describe('StreamWrapperDirectives', () => {
    let fixture: ComponentFixture<TestComponent>;
    let contentTemplate: DebugElement[];
    let loaderTemplate: DebugElement[];

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestComponent,
                StreamWrapperComponent,
                StreamWrapperContentDirective,
                StreamWrapperLoaderDirective,
                ObsWithStatusPipe
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        contentTemplate = fixture.debugElement.queryAll(By.directive(StreamWrapperContentDirective));
        loaderTemplate = fixture.debugElement.queryAll(By.directive(StreamWrapperLoaderDirective));
    });

    it('should have contentTemplate', () => {
        expect(contentTemplate).not.toBeNull();
    });

    it('should have loaderTemplate', () => {
        expect(loaderTemplate).not.toBeNull();
    });
});
