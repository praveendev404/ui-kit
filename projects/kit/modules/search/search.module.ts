import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IconsModule } from '@dagility-ui/kit/icons';

import { SearchComponent } from './search.component';

@NgModule({
    exports: [SearchComponent],
    declarations: [SearchComponent],
    imports: [CommonModule, NgbModule, IconsModule]
})
export class SearchModule {}
