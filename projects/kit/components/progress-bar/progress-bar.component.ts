import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'progress[libProgressBar]',
    template: ``,
    exportAs: 'progressBar',
    styleUrl: './progress-bar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProgressBarComponent {}
