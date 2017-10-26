import { Injectable  } from "@angular/core";
import { IAppSettings } from './app-settings.interface';

@Injectable()
export class AppSettings {

    private static _instance: AppSettings;

    constructor(private _settings: IAppSettings) {}

    public static initialize(settings: IAppSettings) {
        if( this._instance ){
            throw `App Settings already initialized. Settings can not be modified.`;
        }
        this._instance = new AppSettings(settings);
    }

    public static getInstance() {
        if ( this._instance ) {
            return this._instance;
        }
        throw `App Settings has not be loaded`;
    }

    get(key?: any) {
        const settings = this._settings;
        return settings.hasOwnProperty(key) ? settings[key] : null;
    }

    get params(): any{
        return Object.assign({}, this._settings);
    }
}
