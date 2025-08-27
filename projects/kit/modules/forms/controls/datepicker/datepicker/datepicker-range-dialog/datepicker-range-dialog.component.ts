import { ChangeDetectionStrategy, Component, Input, TemplateRef } from '@angular/core';
import { NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'lib-datepicker-range-dialog',
    templateUrl: './datepicker-range-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DatepickerRangeDialogComponent {
    @Input() dp: NgbDatepicker;

    @Input() leftTemplate: TemplateRef<any>;
    @Input() rightTemplate: TemplateRef<any>;
}
