import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const START_FROM_ANGLE = 270;
const CIRCLE_RADIUS = 2;
const CIRCLE_COUNT = 8;
const ANGLE = 360 / CIRCLE_COUNT;
const OPACITY_VALUES = Array.from({ length: CIRCLE_COUNT }).fill(0.12);

@Component({
    selector: 'lib-waiting-loader',
    templateUrl: './waiting-loader.component.html',
    styleUrls: ['./waiting-loader.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class WaitingLoaderComponent implements OnInit {
    loaderRadius = 12;
    circles: {
        transform: string;
        values: string;
    }[];

    ngOnInit() {
        const toRadian = (degree: number) => (degree * Math.PI) / 180;

        this.circles = Array.from({ length: CIRCLE_COUNT }, (_, idx) => {
            const currentAngle = toRadian(START_FROM_ANGLE + idx * ANGLE);
            const currentOpacityValues = [...OPACITY_VALUES];
            currentOpacityValues[idx] = 1;
            const ro = this.loaderRadius - CIRCLE_RADIUS * 2;

            return {
                transform: `translate(${Math.cos(currentAngle) * ro},${Math.sin(
                    currentAngle
                ) * ro})`,
                values: currentOpacityValues.join(';')
            };
        });
    }
}
