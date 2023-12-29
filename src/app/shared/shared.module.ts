import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmComponent } from './components/confirm.component';
import { FlashMessageComponent } from './components/flash-message/flash-message.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { SharedAmountPipe } from './pipes/shared-amount.pipe';
import { AmountFormatterDirective } from './directives/amount-formatter.directive';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxFileDragDropModule } from 'ngx-file-drag-drop';
import { EmailValidatorDirective } from './directives/email-validator.directive';
import { EmailValidationErrorComponent } from './components/common-component/email-validation-error/email-validation-error.component';
import { FormatFileSizePipe } from './pipes/shared-format-size.pipe';

@NgModule({
    declarations: [
        ConfirmComponent,
        FlashMessageComponent,
        ErrorPageComponent,
        SharedAmountPipe,
        AmountFormatterDirective,
        FormatFileSizePipe,
        FileUploadComponent,
        EmailValidatorDirective,
        EmailValidationErrorComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatIconModule,
        NgxFileDragDropModule,
        
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        FlashMessageComponent,
        ErrorPageComponent,
        SharedAmountPipe,
        FormatFileSizePipe,
        AmountFormatterDirective,
        FileUploadComponent,
        EmailValidatorDirective
    ],
    entryComponents: [
        EmailValidationErrorComponent
    ],
    providers: [
        DatePipe,
    ]
})
export class SharedModule {
}
