import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type CardStatusValue =
    | 'approved'
    | 'waiting'
    | 'rejected'
    | 'to-do'
    | 'default';

export const CARD_STATUS_COLORS = {
    approved: 'var(--da-success-base)',
    waiting: 'var(--da-warning-base)',
    rejected: 'var(--da-error-base)',
    'to-do': 'var(--da-blue-base)',
    default: ''
};

export interface CardStatus {
    label: string;
    value: string;
    icon: string | IconProp;
}
