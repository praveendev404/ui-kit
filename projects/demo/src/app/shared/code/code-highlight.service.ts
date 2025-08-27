import { Injectable } from '@angular/core';

import * as prism from 'prismjs';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

@Injectable()
export class CodeHighlightService {
    highlight(code: string, lang: string) {
        return prism.highlight(code.trim(), prism.languages[lang], lang);
    }
}
