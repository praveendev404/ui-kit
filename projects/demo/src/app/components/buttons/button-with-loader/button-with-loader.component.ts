import { Component } from '@angular/core';

@Component({
    selector: 'app-button-with-loader',
    templateUrl: './button-with-loader.component.html',
    standalone: false
})
export class ButtonWithLoaderComponent {
    loading = false;

    text = 'Save';

    clicked = false;

    handleClick() {
        this.text = 'Save';
        if (this.clicked) {
            this.loading = this.clicked = false;
            return;
        }

        this.clicked = this.loading = true;
        setTimeout(() => {
            this.loading = false;
            if (!this.clicked) {
                return;
            }
            this.clicked = false;
            this.text = 'Saved';
        }, 1000);
    }
}
