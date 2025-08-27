import {
    animate,
    state,
    style,
    transition,
    trigger
} from '@angular/animations';
import {
    Component,
    ContentChild,
    HostBinding,
    Input,
    ViewEncapsulation
} from '@angular/core';
import {
    ToastrBodyTemplateDirective,
    ToastrFooterTemplateDirective
} from './toastr.directive';

@Component({
    selector: 'lib-toastr',
    templateUrl: './toastr.component.html',
    styleUrls: ['./toastr.component.scss'],
    animations: [
        trigger('flyInOut', [
            state('inactive', style({
                display: 'none',
                opacity: 0
            })),
            state('active', style({})),
            state('removed', style({ opacity: 0 })),
            transition('inactive => active', animate('{{ easeTime }}ms {{ easing }}')),
            transition('active => removed', animate('{{ easeTime }}ms {{ easing }}'))
        ])
    ],
    host: {
        class: 'toastr m-0'
    },
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class ToastrComponent {
    @Input() toastrType: string;
    @Input() message: string | null;
    @Input() title: string;
    @Input() closeButtonText: string = 'Close';
    @Input() showIcon: boolean = true;
    @Input() htmlBodyContent: boolean;
    @Input() addDefaultFooter: boolean;
    @Input() closeButton: boolean = true;
    @Input() onCloseFunction: Function;

    @ContentChild(ToastrFooterTemplateDirective, { static: true })
    footerTemplate: ToastrFooterTemplateDirective;
    @ContentChild(ToastrBodyTemplateDirective, { static: true })
    bodyTemplate: ToastrBodyTemplateDirective;

    @HostBinding('class') get class() {
        return 'toastr-' + this.toastType;
    }

    get messageIcon(): string {
        return this.getTypeOrIcon(true);
    }

    get toastType(): string {
        return this.getTypeOrIcon();
    }

    get isNotification() {
        return this.getTypeOrIcon() === 'notification';
    }

    onClose() {
        this.onCloseFunction.call(this);
    }

    getMessage() {
        try {
            return JSON.parse(this.message).message;
        } catch (e) {
            return this.message;
        }
    }

    getTypeOrIcon(getIcon?: boolean) {
        if (!this.toastrType) {
            return;
        }

        switch (true) {
            case this.toastrType.toLowerCase().includes('error'):
                return getIcon ? 'facExclamationCircle' : 'error';

            case this.toastrType.toLowerCase().includes('info'):
                return getIcon ? 'facExclamationCircle' : 'info';

            case this.toastrType.toLowerCase().includes('success'):
                return getIcon ? 'check' : 'success';

            case this.toastrType.toLowerCase().includes('warning'):
                return getIcon ? 'exclamationTriangle' : 'warning';

            case this.toastrType.toLowerCase().includes('notification'):
                return getIcon ? 'facExclamationCircle' : 'notification';
        }
    }
}
