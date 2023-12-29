import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'common-component',
  templateUrl: './common-component.component.html'
})
export class CommonComponent {

  protected _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor() { }

}
