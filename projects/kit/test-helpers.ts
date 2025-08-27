import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function getByTestId(fixture: ComponentFixture<any>, testId: string) {
    return fixture.debugElement.query(By.css(`[data-test-id="${testId}"]`));
}

export function getAllByTestId(fixture: ComponentFixture<any>, testId: string) {
    return fixture.debugElement.queryAll(By.css(`[data-test-id="${testId}"]`));
}
