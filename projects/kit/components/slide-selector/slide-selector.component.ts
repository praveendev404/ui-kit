import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'lib-slide-selector',
    templateUrl: './slide-selector.component.html',
    styleUrls: ['./slide-selector.component.scss'],
    standalone: false
})
export class SlideSelectorComponent implements OnInit {
    @Input() items: SliderItem[];
    @Output() selectedTab: EventEmitter<number> = new EventEmitter();

    viewSelector = 0;
    currentLeftPosition: number;
    itemsVm: SliderItemWithPosition[];

    constructor() {}

    ngOnInit() {
        this.itemsVm = this.normalizeWidths(this.items || []);
    }

    changeView(index: number) {
        this.viewSelector = index;

        let leftPosition = 0;
        for (let i = 0; i < index && i < this.itemsVm.length; ++i) {
            leftPosition += this.itemsVm[i].widthPercent;
        }
        this.currentLeftPosition = leftPosition;

        this.selectedTab.emit(this.viewSelector);
    }

    normalizeWidths(items: SliderItem[]): SliderItemWithPosition[] {
        let widthUndefCount = 0;
        const widthSum = items.reduce((acc, curr) => {
            if (!curr.widthPercent) {
                ++widthUndefCount;
            }
            return acc + (curr.widthPercent || 0);
        }, 0);

        const rest = 100 - widthSum;
        const normalizeCoeff = widthSum / 100;
        const normalize = normalizeCoeff > 1;
        let leftPosition = 0;
        return items.map(item => {
            const result = {
                ...item,
                widthPercent: !normalize
                    ? item.widthPercent
                        ? item.widthPercent
                        : rest / widthUndefCount
                    : (item.widthPercent || 0) / normalizeCoeff,
                leftPositionPercent: leftPosition,
            };
            leftPosition += result.widthPercent;
            return result;
        });
    }
}

export interface SliderItem {
    title: string;
    widthPercent?: number;
}

interface SliderItemWithPosition extends SliderItem {
    leftPositionPercent: number;
}
