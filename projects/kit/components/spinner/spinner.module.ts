import { NgModule } from '@angular/core';
import { SpinnerComponent } from './spinner.component';
import { ProgressSpinnerComponent } from './progress-spinner.component';

@NgModule({
    declarations: [SpinnerComponent, ProgressSpinnerComponent],
    exports: [SpinnerComponent, ProgressSpinnerComponent]
})
export class SpinnerModule {}
