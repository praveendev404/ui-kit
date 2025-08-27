import { Inject, NgModule, Optional, SkipSelf } from '@angular/core';
import { DefaultGlobalConfig, TOAST_CONFIG, ToastToken } from 'ngx-toastr';

export function toasterConfigFactory(config: ToastToken) {
    return config || {
        default: DefaultGlobalConfig,
        config: {},
    };
}
@NgModule({
    providers: [
        {
            provide: TOAST_CONFIG,
            useFactory: toasterConfigFactory,
            deps: [[new Inject(TOAST_CONFIG), new Optional(), new SkipSelf()]]
        }
    ]
})
export class ToasterModule {}
