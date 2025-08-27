export interface MarketplaceTemplateRating {
    rate1: number;
    rate2: number;
    rate3: number;
    rate4: number;
    rate5: number;
    downloads: number;
    rating: number;
    myRating: number;
    ratesCount?: number;
}

export interface MarketplaceTemplateItem {
    id: number;
    name: string;
    description: string;
    type: string;
    modifiedAt: string;
    marketplaceGuid?: string;
    downloads: number;
    rate: number;
    recommended: boolean;
    status: string;
    myRate: number;
}

export interface RatingRowItem {
    label: string;
    width: string;
    height: string;
    value: number;
}

export type TranslationKeysOfRating = 'CHANGE_MY_RATE' | 'RATE_IT_NOW' | 'USER_RATINGS'| 'DOWNLOADS' | 'RATING_OF' |
    'WILL_CHANGE' | 'OVERALL_RATING' | 'CANCEL' | 'RATE' | 'STAR' | 'STARS';
