import { NgModule, Pipe, PipeTransform } from '@angular/core';
import {
    DomSanitizer,
    SafeHtml,
    SafeResourceUrl,
    SafeScript,
    SafeStyle,
    SafeUrl
} from '@angular/platform-browser';

export type SafePipeType = 'html' | 'style' | 'script' | 'url' | 'resourceUrl';

@Pipe({
    name: 'safeHtml',
    pure: true,
    standalone: false
})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {}

    transform(
        value: string,
        type: SafePipeType,
        args?: any
    ): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html':
                return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style':
                return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script':
                return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url':
                return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl':
                return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default:
                return this.sanitizer.bypassSecurityTrustHtml(value);
        }
    }
}

@NgModule({
    declarations: [SafeHtmlPipe],
    exports: [SafeHtmlPipe]
})
export class SafeHtmlPipeModule {}
