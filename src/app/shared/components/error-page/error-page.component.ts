import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-page',
  templateUrl: './error-page.component.html'
})
export class ErrorPageComponent implements OnInit {

  @Input() errorMessage: string = '';
  constructor() { }

  ngOnInit(): void {
    console.log(this.errorMessage)
  }

}
