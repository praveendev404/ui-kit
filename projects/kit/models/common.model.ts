export interface EnvironmentModel {
    production?: boolean;
    serviceUrl?: string;
    fileStoragePath?: string;
    adminURL?: string;
    adminApiURL?: string;
    updateApiURL?: string;
    habitatApiURL?: string;
    stompApiUrl?: string;
    buildApiURL?: string;
    insightApiURL?: string;
    monitorApiURL?: string;
    streamApiURL?: string;
    dpApiURL?: string;
    webconsoleApiUrl?: string;
    keycloakParams?: any;
    helpSupportParams?: any;
    eclipseCheUrl?: string;
    component?: boolean;
    theme?: string;
    aiApi?: string;
}

export type SortDirection = 'ASC' | 'DESC';
