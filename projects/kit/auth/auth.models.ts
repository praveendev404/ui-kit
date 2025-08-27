import { InjectionToken } from "@angular/core";

export interface Env {
  production: boolean;
  adminURL: string;
  adminApiURL: string;
  serviceUrl: string;
  keycloakParams: {
    enable: boolean;
    url: string;
    realm: string;
    clientId: string;
    'ssl-required': string;
    'public-client': boolean;
  };
}

export interface AuthTokenProvider {
  getTokenApi(): string; 
}

export const AUTH_TOKEN_PROVIDER = new InjectionToken<AuthTokenProvider>('AUTH_TOKEN_PROVIDER');