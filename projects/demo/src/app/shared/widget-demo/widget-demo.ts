import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit
} from '@angular/core';
import { ISnippet, Snippet } from '../code/snippet';
import { DemoCodeService } from '../../demo-code.service';

export const TYPES: { [name: string]: string } = {
    html: 'HTML',
    scss: 'Style (SCSS)',
    css: 'Style (CSS)',
    ts: 'Typescript'
};

@Component({
    selector: 'app-widget-demo',
    templateUrl: './widget-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./widget-demo.component.scss'],
    standalone: false
})
export class WidgetDemoComponent {
    @Input() demoTitle: string;
    @Input() id: string;
    @Input() showCode = false;
    @Input() code: string;
    @Input() markup: string;
    @Input() files: { name: string; source: string }[];

    codeService = inject(DemoCodeService);

    get hasManyFiles() {
        return this.files && this.files.length > 5;
    }
    get markupSnippet() {
        return Snippet({ lang: 'html', code: this.codeService.getDemoSource(this.markup) });
    }
    get codeSnippet() {
        return Snippet({ lang: 'typescript', code: this.codeService.getDemoSource(this.code) });
    }

    tabType(name: string) {
        return TYPES[name.split('.').pop() || ''] || 'Code';
    }

    getFileSnippet({ name, source }): ISnippet {
        return Snippet({ code: source, lang: name.split('.').pop() || '' });
    }
}
