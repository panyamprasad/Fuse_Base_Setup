import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-email-validation-error',
  templateUrl: './email-validation-error.component.html'
})
export class EmailValidationErrorComponent {

  @Input() errorMessage: string;

  constructor() { 

    this.errorMessage = 'Please enter valid email';
  }

}
