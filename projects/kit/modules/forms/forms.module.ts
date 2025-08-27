import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconsModule } from '@dagility-ui/kit/icons';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'perfect-scrollbar-angular';
import {
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbRatingModule,
    NgbTooltipModule,
    NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';

import { SpinnerModule } from '../../components/spinner/spinner.module';
import { ModalHeaderModule } from '../../components/modals/modal-header/modal-header.module';
import { SafeHtmlPipeModule } from '../../pipes/safe-html.pipe';

import { TooltipWhenOverflowModule } from '../../directives/tooltip-when-overflow.directive';
import { ValidationErrorsComponent } from './validation/validation-errors/validation-errors.component';
import { ValidationErrorDirective } from './validation/validation-errors/validation-error.directive';

import { ErrorControlDirective } from './validation/error-control/error-control.directive';
import { ErrorMessageComponent } from './validation/error-control/error-message/error-message.component';

import { InputComponent } from './controls/input/input.component';
import { TextareaComponent } from './controls/textarea/textarea.component';
import {
    DropdownComponent,
    DropdownHeaderTemplateDirective,
    PerfectScrollbarStylesComponent
} from './controls/dropdown/dropdown.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { RadioGroupComponent } from './controls/radio-group/radio-group.component';

import { FormSubmitDirective } from './directives/form-submit.directive';
import { FormDirtyDirective } from './directives/form-dirty.directive';
import { WarningMessageComponent } from './validation/error-control/warning-message/warning-message.component';
import { DropdownAddTagValidatorDirective } from './validation/dropdown-add-tag-validator.directive';

import { RadioButtonComponent } from './controls/radio-button/radio-button.component';
import { OutsideClickDirective } from './directives/outside-click.directive';

import { DatepickerModule } from './controls/datepicker/datepicker.module';
import { RatingComponent } from './controls/rating/rating.component';
import { RatingModalComponent } from './controls/rating/rating-modal/rating-modal.component';
import { TypeaheadComponent } from './controls/typeahead/typeahead.component';
import { TreelikeDropdownComponent } from './controls/treelike-dropdown/treelike-dropdown.component';
import { TreelikeMenuComponent } from './controls/treelike-menu/treelike-menu.component';
import {
    ContentEditableTextElementDirective,
    InlineInputComponent,
    LibInlineInputElementDirective
} from './controls/inline-input/inline-input.component';

const directives = [
    ValidationErrorDirective,
    FormSubmitDirective,
    ErrorControlDirective,
    FormDirtyDirective,
    DropdownAddTagValidatorDirective,
    OutsideClickDirective,
    DropdownHeaderTemplateDirective
];

const components = [
    ValidationErrorsComponent,
    WarningMessageComponent,
    RadioButtonComponent,
    RatingModalComponent,
    PerfectScrollbarStylesComponent,
    ContentEditableTextElementDirective,
    InlineInputComponent,
    LibInlineInputElementDirective
];

const controls = [
    CheckboxComponent,
    DropdownComponent,
    InputComponent,
    TextareaComponent,
    RadioGroupComponent,
    RatingComponent,
    TypeaheadComponent,
    TreelikeDropdownComponent,
    TreelikeMenuComponent
];

const declarables = [...directives, ...components, ...controls];

@NgModule({
    imports: [
        CommonModule,
        IconsModule,
        NgSelectModule,
        NgbProgressbarModule,
        NgbRatingModule,
        NgbDropdownModule,
        SpinnerModule,
        SafeHtmlPipeModule,
        FormsModule,
        ReactiveFormsModule,
        PerfectScrollbarModule,
        NgbTooltipModule,
        NgbTypeaheadModule,
        TooltipWhenOverflowModule,
        ModalHeaderModule
    ],
    declarations: [...declarables, ErrorMessageComponent],
    exports: [
        ...declarables,
        FormsModule,
        ReactiveFormsModule,
        IconsModule,
        DatepickerModule
    ]
})
export class LibFormsModule {
    constructor() {
        RatingComponent.ratingModalComponent = RatingModalComponent;
    }
}

export { RadioButtonComponent, RatingModalComponent, DatepickerModule };
