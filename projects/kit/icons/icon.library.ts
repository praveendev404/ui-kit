import { CustomIcon } from './types';

import * as customIcons from './custom-icons';

export const CUSTOM_ICONS = Object.values(customIcons).filter((icon: any) => !!icon.prefix) as CustomIcon[];

CUSTOM_ICONS.forEach((icon: CustomIcon) => (icon.prefix = 'far'));
