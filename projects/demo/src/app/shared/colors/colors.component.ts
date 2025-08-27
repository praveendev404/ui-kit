import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-colors',
    templateUrl: './colors.component.html',
    styleUrls: ['./colors.component.scss'],
    standalone: false
})
export class ColorsComponent {
    colors: ColorGroup[];

    constructor(route: ActivatedRoute) {
        this.colors = route.snapshot.data?.colors || [];
    }
}

export interface ColorGroup {
    title: string;
    colors: Color[];
}

interface Color {
    name: string;
    value: string;
    textColor: string;
}
