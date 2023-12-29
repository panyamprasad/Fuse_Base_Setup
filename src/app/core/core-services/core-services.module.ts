import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestAPIConnectorProvider } from './providers/rest-api-connector';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers:[
    RestAPIConnectorProvider
  ]
})
export class CoreServicesModule { }
