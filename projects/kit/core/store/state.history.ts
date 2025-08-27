import { Subscription } from 'rxjs';
import { pairwise } from 'rxjs/operators';
import { Store } from './store';

export interface StateHistoryOptions {
    bufferSize: number;
}

interface History {
    past: any[];
    present: any;
    future: any[];
}

export class StateHistory {
    private history: History = {
        past: [],
        present: null,
        future: []
    };

    private subscription = Subscription.EMPTY;

    private skipUpdate: boolean;

    /** Allow skipping an update from outside */
    private skip = false;

    constructor(
        private store: Store<any>,
        private options: StateHistoryOptions = { bufferSize: 10 }
    ) {
        this.enable();
    }

    ignoreNext() {
        this.skip = true;
    }

    get hasPast(): boolean {
        return !!this.history.past.length;
    }

    get hasFuture(): boolean {
        return !!this.history.future.length;
    }

    enable() {
        this.history.present = this.store.value;
        this.subscription = this.store
            .pipe(pairwise())
            .subscribe(([past, present]) => {
                if (this.skipUpdate) {
                    return;
                }

                if (this.skip) {
                    this.skip = false;
                    return;
                }

                if (this.history.past.length === this.options.bufferSize) {

                    this.history.past = this.history.past.slice(1);
                }
                this.history.past = [...this.history.past, past];
                this.history.present = present;
                this.history.future = [];
            });
    }

    undo() {
        if (!this.hasPast) {
            return;
        }

        const { past, present } = this.history;
        const previous = past[past.length - 1];
        this.history.past = past.slice(0, past.length - 1);
        this.history.present = previous;
        this.history.future = [present, ...this.history.future];
        this.update();
    }

    redo() {
        if (!this.hasFuture) {
            return;
        }

        const { past, present } = this.history;
        const next = this.history.future[0];
        const newFuture = this.history.future.slice(1);
        this.history.past = [...past, present];
        this.history.present = next;
        this.history.future = newFuture;
        this.update();
    }

    private update() {
        this.skipUpdate = true;
        this.store.next(this.history.present);
        this.skipUpdate = false;
    }

    destroy() {
        this.subscription.unsubscribe();
    }
}
