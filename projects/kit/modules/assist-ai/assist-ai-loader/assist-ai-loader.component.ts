import {
    Component,
    ChangeDetectionStrategy,
    inject,
    ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { starsSvg } from '@dagility-ui/kit/icons';

@Component({
    selector: 'lib-assist-ai-loader',
    templateUrl: './assist-ai-loader.component.html',
    styleUrls: ['./assist-ai-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
})
export class AssistAiLoaderComponent {
    starsSvg = inject(DomSanitizer).bypassSecurityTrustHtml(starsSvg);
}
