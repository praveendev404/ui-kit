import { Component } from '@angular/core';

@Component({
    selector: 'app-tags',
    templateUrl: './tags.component.html',
    styleUrls: ['./tags.component.scss'],
    standalone: false
})
export class TagsComponent {
    handleRemove() {
        alert('Tag was removed');
    }
}
