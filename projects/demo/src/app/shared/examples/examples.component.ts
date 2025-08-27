import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-examples',
    templateUrl: './examples.component.html',
    standalone: false
})
export class ExamplesComponent {
    demos: any = [];

    constructor(route: ActivatedRoute) {
        const demos = route.snapshot.data?.demos;
        if (demos) {
            this.demos = Object.keys(demos).map(id => {
                return { id, ...demos[id] };
            });
        }
    }
}
