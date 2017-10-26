import {NgModule, InjectionToken} from '@angular/core';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig{
    apiEndPoint: string;
}

export const APP_DI_CONFIG: AppConfig = {
    apiEndPoint: 'http://tickets.local/api/'
};

@NgModule({
    providers: [{
        provide: APP_CONFIG,
        useValue: APP_DI_CONFIG
    }],
})
export class AppConfigModule {
}
