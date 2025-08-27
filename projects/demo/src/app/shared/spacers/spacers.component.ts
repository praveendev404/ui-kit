import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-spacers',
    templateUrl: './spacers.component.html',
    styleUrls: ['./spacers.component.scss'],
    standalone: false
})
export class SpacersComponent {
    spacers: Spacer[];

    constructor(route: ActivatedRoute) {
        this.spacers = route.snapshot.data?.spacers || [];
    }

    parseSpacer(spacer: string): string {
        return spacer.substring(spacer.indexOf('-') + 1);
    }
}

export interface Spacer {
    groupName: string;
    values: string[];
    bootstrapValues?: BootstrapSpacer[];
}

interface BootstrapSpacer {
    name: string;
    description: string;
}
