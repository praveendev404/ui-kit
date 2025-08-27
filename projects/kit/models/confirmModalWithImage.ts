import { CustomIcon } from '@dagility-ui/kit/icons';
import { ConfirmModal } from '..';

export interface ConfirmModalWithImage extends ConfirmModal {
    image?: CustomIcon | string;
    imageColor?: string;
    imageFontSize?: string;
    icon?: CustomIcon | string;
    iconColor?: string;
    iconFontSize?: string;
}
