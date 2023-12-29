import { Component, Inject, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'shared-confirm',
    templateUrl: './confirm.component.html'
})

export class ConfirmComponent implements OnInit {
    configData: any;
    title: string = "Confirm";
    bodyText: string = "Are you sure to proceed?";
    confirmButtonText = "Yes";
    cancelButtonText = "Cancel";
    modalType: string = 'success';
    hideCancelButton: boolean = false;

    constructor(private dialogRef: MatDialogRef<ConfirmComponent>,
        @Inject(MAT_DIALOG_DATA) data) {
        this.configData = data;
        if (data) {
            this.bodyText = data.bodyText || this.bodyText;
            this.title = data.title || this.title;
            this.modalType = data.modalType || 'success';
            this.hideCancelButton = data.hideCancelButton;
            if (data.buttonText) {
                this.confirmButtonText = data.buttonText.ok || this.confirmButtonText;
                this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
            }
        }
    }

    ngOnInit() { }
}