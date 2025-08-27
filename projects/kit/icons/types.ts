type IconDefinition = import('@fortawesome/fontawesome-common-types').IconDefinition;

export interface CustomIcon {
    prefix: 'fac' | 'far' | any;
    iconName: string | any;
    icon: IconDefinition['icon'];
    customStyles?: Record<string, any>;
    pathAttrs?: Record<string, any>;
}
