import { Component, Input } from '@angular/core';

@Component({
    selector: 'lib-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss'],
    standalone: false
})
export class LoaderComponent {
    @Input() size: string = '15px';

    @Input() type: 'white' | 'brand' = 'brand';
}
