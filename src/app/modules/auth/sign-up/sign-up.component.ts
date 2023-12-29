import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { FuseValidators } from '@fuse/validators';
import { AuthService } from 'app/core/auth/auth.service';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    showTimer: boolean = false;

    countdown: number = 5;
    countdownMapping: any = {
        '=1': '# second',
        'other': '# seconds'
    };
    showPasswordFields: boolean = false;

    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            application_id: ['', Validators.required],
            zip_code: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            password_confirmation: ['', Validators.required],
            job_function: ['Customer'],
            // agreements: ['', Validators.requiredTrue]
        },
            {
                validators: FuseValidators.mustMatch('password', 'password_confirmation')
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        // Do nothing if the form is invalid
        // if (this.signUpForm.invalid) {
        //     return;
        // }

        // Disable the form
        this.signUpForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign up
        this._authService.signUp(this.signUpForm.value)
            .subscribe(
                (response) => {
                    // Re-enable the form
                    this.signUpForm.enable();

                    //this.signUpNgForm.resetForm();
                    if (response) { // && response.error
                        const status = response.status;
                        if (status === 4001) {

                            this.alert.type = 'error';
                            // this.alert.message = 'No application or customer associated with data.'; // Display as is to change the form data
                            this.alert.message = response.message;

                            this.disableFormFields(false);

                        } else if (status === 4002) {

                            this.disableFormFields(false);
                            this.alert.type = 'error';
                            // this.alert.message = response.message;
                            this.alert.message = 'Your application is associated with your PFC login account. Please login using existing PFC online account.'; // Display login link showTimerWindow()

                        } else if (status === 4003) {

                            this.alert.type = 'success';
                            this.alert.message = 'Please enter password and proceed with Signup.'; // Display password fields and Submit to same api with data 
                            this.showPasswordFields = true;
                            this.disableFormFields(true);

                        } else if (status === 200) {

                            this.showTimer = true;
                            this.showTimerWindow();

                        } else if (
                            status === 0 &&
                            (
                                response.message && response.message.email &&
                                response.message.email.length > 0 &&
                                response.message.email[0].indexOf('already been taken') > 0
                            )
                        ) {

                            this.alert.type = 'error';
                            this.disableFormFields(false);
                            this.alert.message = 'The email has already been taken.';

                        } else {

                            this.alert.type = 'error';
                            this.disableFormFields(false);
                            this.alert.message = 'Something went wrong, please try again.';

                        }

                        // Show the alert
                        this.showAlert = true;
                        return;

                    }

                    this.alert.message = 'Something went wrong, please try again.';
                    this.showAlert = true;

                },
                (response) => {
                    // this.showTimer = true;
                    // this.showTimerWindow();
                    this.alert.type = 'error';
                    this.disableFormFields(false);
                    this.alert.message = response?.error?.message;
                },
            );
    }

    /**
     * Disable/Enable form fields.
     * 
     * @param enable Enable/Disable.
     */
    private disableFormFields(enable: boolean): void {

        if (enable) {
            this.signUpForm.get('application_id').disable();
            this.signUpForm.get('zip_code').disable();
            this.signUpForm.get('email').disable();
        } else {
            this.signUpForm.get('application_id').enable();
            this.signUpForm.get('zip_code').enable();
            this.signUpForm.get('email').enable();
        }
    }

    showTimerWindow(): void {
        // Redirect after the countdown
        timer(1000, 1000)
            .pipe(
                finalize(() => {
                    this._router.navigate(['sign-in']);
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
    }
}
