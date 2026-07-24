import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { LanguageComponent } from 'app/layout/common/language/language.component';
import { SharedModule } from 'app/shared/shared.module';

@NgModule({
    declarations: [
        LanguageComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        SharedModule
    ],
    exports     : [
        LanguageComponent
    ]
})
export class LanguageModule
{
}
