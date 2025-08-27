import { NgModule } from '@angular/core';
import {
    FaConfig,
    FaIconLibrary,
    FontAwesomeModule
} from '@fortawesome/angular-fontawesome';
import { FaCustomIconDirective } from './fa-custom-icon.directive';
import { CUSTOM_ICONS } from './icon.library';

@NgModule({
    declarations: [FaCustomIconDirective],
    imports: [FontAwesomeModule],
    exports: [FontAwesomeModule, FaCustomIconDirective]
})
export class IconsModule {
    constructor(faConfig: FaConfig, iconLibrary: FaIconLibrary) {
        faConfig.defaultPrefix = 'far';
        iconLibrary.addIcons(...CUSTOM_ICONS);
    }
}
