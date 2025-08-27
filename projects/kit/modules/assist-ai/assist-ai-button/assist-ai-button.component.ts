import {
    ChangeDetectionStrategy,
    Component,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { starsSvg } from '@dagility-ui/kit/icons';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'button[assist-ai-button]',
    template: `
        <span class="stars-container" [innerHTML]="starsSvg"></span>
        <ng-content></ng-content>
    `,
    styleUrls: ['./assist-ai-button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})
export class AssistAiButtonComponent {
    starsSvg = inject(DomSanitizer).bypassSecurityTrustHtml(starsSvg);
}
