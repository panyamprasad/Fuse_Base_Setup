import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";

@Component({
    selector: 'shared-flash-message',
    templateUrl: './flash-message.component.html'
})

export class FlashMessageComponent implements OnInit {

    @Input() flashMessage: 'success' | 'error' | null;
    @Input() timeDelay: number;

    @Output() flashMessageChange: EventEmitter<any> = new EventEmitter<any>();

    constructor() {

        // this.timeDelay = 2000;

    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes.flashMessage && changes.flashMessage.currentValue) {

            this.dismissMessage()

        }

    }

    ngOnInit() { }

    private dismissMessage(): void {

        if (this.timeDelay) {
            setTimeout(() => {

                this.flashMessage = null;

                this.flashMessageChange.emit(this.flashMessage);

            }, this.timeDelay);
        }

    }
}