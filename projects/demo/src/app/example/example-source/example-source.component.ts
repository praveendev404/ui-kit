import { Component, Input, inject } from '@angular/core';
import {ISnippet, Snippet} from '../../shared/code/snippet';
import {TYPES} from '../../shared/widget-demo/widget-demo';
import { DemoCodeService } from '../../demo-code.service';

@Component({
    selector: 'app-example-source',
    templateUrl: './example-source.component.html',
    styleUrls: ['./example-source.component.scss'],
    standalone: false
})
export class ExampleSourceComponent {
    @Input() id: string;
    @Input() showCode = false;
    @Input() files: { name: string; source: string }[];

    codeService = inject(DemoCodeService);

    code = 'example.component.ts';
    markup = 'example.component.html';

    get hasManyFiles() {
        return this.files && this.files.length > 5;
    }

    get markupSnippet() {
        return Snippet({ lang: 'html', code: this.codeService.getDemoSource(this.markup)});
    }

    get codeSnippet() {
        return Snippet({ lang: 'typescript', code: this.codeService.getDemoSource(this.code)});
    }

    tabType(name: string) {
        return TYPES[name.split('.').pop() || ''] || 'Code';
    }

    getFileSnippet({ name, source }): ISnippet {
        return Snippet({ code: source, lang: name.split('.').pop() || '' });
    }

}
