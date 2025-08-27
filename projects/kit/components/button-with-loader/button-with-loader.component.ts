import { Component, ContentChild, Input, TemplateRef } from '@angular/core';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'button[btnWithLoader]',
    templateUrl: './button-with-loader.component.html',
    styleUrls: ['./button-with-loader.component.scss'],
    standalone: false
})
export class ButtonWithLoaderComponent {
    @Input('btnWithLoader') loading = false;
    @Input() loadingText: string = 'Loading...';

    @ContentChild(TemplateRef) loaderTemplate: TemplateRef<void>;
}
