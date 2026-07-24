import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen/fullscreen.component';

@NgModule({
    declarations: [
        FuseFullscreenComponent
    ],
    imports     : [
        MatButtonModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports     : [
        FuseFullscreenComponent
    ]
})
export class FuseFullscreenModule
{
}
