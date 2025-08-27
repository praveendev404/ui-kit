import { Component } from '@angular/core';

@Component({
    selector: 'app-ai-assist',
    template: `
        <lib-assist-ai-loader class="h2 my-0">
            <h2 class="my-0">Generating...</h2>
        </lib-assist-ai-loader>
        <button assist-ai-button>Ask AI</button>
    `,
    host: {
        class: 'd-flex flex-column align-items-start',
        style: 'gap: 1rem;',
    },
    standalone: false
})
export class AssitAiComponent {}
