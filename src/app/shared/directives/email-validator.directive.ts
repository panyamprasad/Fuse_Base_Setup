import { Directive, HostListener, Optional, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Input } from '@angular/core';
import { NgControl } from '@angular/forms';
import { EmailValidationErrorComponent } from '../components/common-component/email-validation-error/email-validation-error.component';
import { build } from 'xregexp';

@Directive({
  selector: 'input[type="email"]'
})
export class EmailValidatorDirective {

  private componentReference: ComponentRef<EmailValidationErrorComponent>;
  private container: ViewContainerRef;
  private notifyOfInvalidEmail: boolean;

  @Input() emailValidationErrorMessage: string = '';

  constructor(
    private element: ElementRef,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() private formControl: NgControl
  ) { 

    this.notifyOfInvalidEmail = true;

    this.container = this.viewContainer;

  }

  /**
   *
   * On blur checks email validation.
   *
   */
  @HostListener('blur', ['$event.target.value']) @HostListener('input', ['$event.target.value']) validateFormControl(value) {

    if (this.formControl && this.formControl.control) {
      this.emailValidation(value);
    }

  }

  /**
   *
   * Detects and notifies with error messages.
   *
   */
  private emailValidation(value) {

    let isInvalidText: boolean;

    const pattern = new RegExp("^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$");

    isInvalidText = pattern.test(value);

    if (value && value.length >0) {

      if (!isInvalidText) {

        this.formControl.control.setErrors({ 'pattern': true });
  
      } else if (this.formControl.control.hasError('pattern')) {
  
        this.formControl.control.setErrors({ 'pattern': null });
  
      }

      if (this.notifyOfInvalidEmail && this.formControl && this.formControl.control.errors && this.formControl.control.errors.pattern) {

        if (!this.componentReference) {
          const factory = this.resolver.resolveComponentFactory(EmailValidationErrorComponent);
          this.componentReference = this.container.createComponent(factory);
  
          if (this.emailValidationErrorMessage) {
            this.componentReference.instance.errorMessage = this.emailValidationErrorMessage;
          }
  
        }
  
      } else {
  
        if (this.container) {
          this.container.clear();
        }
  
        this.componentReference = null;
  
      }

    } else {

      if (this.formControl.control.hasError('pattern')) {
  
        this.formControl.control.setErrors({ 'pattern': null });
  
      }

      if (this.container) {
        this.container.clear();
      }

      this.componentReference = null;

    }

  }

}
