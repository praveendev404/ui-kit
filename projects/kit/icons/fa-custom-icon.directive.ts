import { ChangeDetectorRef, Directive, Input, OnChanges } from '@angular/core';
import { FaConfig, FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { icon, toHtml, config } from '@fortawesome/fontawesome-svg-core';
import { CustomIcon } from './index';

config.autoAddCss = false;

@Directive({
    selector: 'fa-icon',
    standalone: false
})
export class FaCustomIconDirective implements OnChanges {
    @Input() icon: string | Record<string, any>;

    customStyles: Record<string, any>;
    pathAttrs: Record<string, any>;

    constructor(private faIconComponent: FaIconComponent, private faLibrary: FaIconLibrary, private faConfig: FaConfig, private cdRef: ChangeDetectorRef) {
        const originalRenderIcon = (this.faIconComponent as any).renderIcon;
        const comp = this;
        (this.faIconComponent as any).renderIcon = function(definition: any, params: any) {
            const args = arguments;
            Promise.resolve().then(() => {
                if (comp.customStyles) {
                    Object.assign(params.styles, comp.customStyles);
                    const renderedIcon = icon(definition, params);
                    const html = renderedIcon.abstract.map(elem => {
                        (elem.children || []).forEach(child => {
                            if ('fill' in child.attributes) {
                                delete child.attributes.fill;
                            }

                            if (child.tag === 'path' && comp.pathAttrs) {
                                child.attributes = { ...child.attributes, ...comp.pathAttrs};
                            }
                        });
                        return toHtml(elem);
                    });
                    this.renderedIconHTML = this.sanitizer.bypassSecurityTrustHtml(html.join('\n'));
                } else {
                    originalRenderIcon.apply(this, args);
                }
                comp.cdRef.markForCheck();
            });
        };
    }

    ngOnChanges() {
        if (typeof this.icon === 'string') {
            const iconDef = this.faLibrary.getIconDefinition(this.faConfig.defaultPrefix, this.icon as any) as CustomIcon;
            this.customStyles = iconDef.customStyles;
            this.pathAttrs = iconDef.pathAttrs;
        } else if (this.icon && this.icon.customStyles) {
            this.customStyles = this.icon.customStyles;
            this.pathAttrs = this.icon.pathAttrs;
        }
    }
}
