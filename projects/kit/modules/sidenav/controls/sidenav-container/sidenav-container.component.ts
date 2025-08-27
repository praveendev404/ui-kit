import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    OnDestroy
} from '@angular/core';

import { SidenavComponent } from '../sidenav/sidenav.component';
import { startWith } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
    selector: 'lib-sidenav-container',
    templateUrl: './sidenav-container.component.html',
    styleUrls: ['./sidenav-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class SidenavContainerComponent implements OnDestroy {
    @ContentChild(SidenavComponent)
    set sidenavSetter(sidenav: SidenavComponent) {
        this.sidenav = sidenav;
        if (!sidenav) {
            return;
        }
        this.subscription.unsubscribe();
        this.subscription = sidenav.modeChange
            .pipe(startWith(sidenav.mode))
            .subscribe(mode => {
                // exp.has been changed (remove setTimeout)
                setTimeout(() => {
                    if (mode === 'push' && this.sidenav.expanded) {
                        this.leftMargin = 0;
                    } else if (mode === 'over') {
                        this.leftMargin = 48;
                    }
                    this.cdr.markForCheck();
                });
            });
    }

    sidenav: SidenavComponent;

    leftMargin: number = 0;

    private subscription = Subscription.EMPTY;

    constructor(private readonly cdr: ChangeDetectorRef) {}

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
