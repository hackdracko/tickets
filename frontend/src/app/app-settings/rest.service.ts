/**
 * Rest API Cliente Service
 *
 * author: Artziel Narvaiza <artziel@gmail.com>
 */
import { Injectable, ElementRef  } from '@angular/core';
import { Http, Response, Headers, RequestOptions, ResponseContentType } from '@angular/http';

import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { isUndefined } from "util";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/takeUntil';

/**
 * Define the Error Hook function to be executed on specific status code
 */
export interface IErrorCallback{
    (err: Response);
}

/**
 * Pair status code and hook to be used when response error occure
 */
export interface IRestErrors{
    code: number;
    callback: IErrorCallback;
}

/**
 * Rest client service options
 */
export interface IRestOptions{
    apiEndPoint?: string;
    tokenName?: string;
    mockData?: boolean;
}

/**
 * Exported Injectable Service class
 */
@Injectable()
export class RestClientService {

    /**
     * Default requests header
     *
     * @type {{accept: string; Cache-Control: string; Pragma: string}}
     */
    protected baseHeader = {
        'accept'        : 'application/json',
        'Cache-Control' : 'no-cache',
        'Pragma'        : 'no-cache'
    };

    /**
     * When true, the request header will include the authentication token
     *
     * @type boolean
     */
    protected secureRequest: boolean = false;

    /**
     * When a file name is set Download request Mode will be enabled, this will be use
     * for the downloaded file name
     *
     * @type string
     */
    protected downloadFileName: string = null;

    /**
     * Determines whether all requests should be stopped
     *
     * @type {Subject<boolean>}
     */
    protected stopRequests$: Subject<boolean> = new Subject<boolean>();

    /**
     * Service configuration options
     *
     * @type IRestOptions
     */
    protected options: IRestOptions;

    /**
     * Array of callback function to be execute on specific errors
     * @type {Array}
     */
    protected errCallbacks: IRestErrors[]=[];

    /**
     * Holds a list of files to be upload on request
     * @type {Array}
     */
    protected uploads: FileList[] = [];

    /**
     * Add files to the list of files to be upload on the next request
     *
     * @param file
     * @returns {RestClientService}
     */
    public addFiles(file: ElementRef ){
        if( file.nativeElement.type == 'file' && file.nativeElement.files.length > 0 ){
            this.uploads.push(file.nativeElement.files);
        }
        return this;
    }

    /**
     * Service constructor
     *
     * @param http
     * @param cookie
     * @param ApiEndPoint
     */
    constructor( private http: Http, private cookies: CookieService, options?: IRestOptions ) {
        this.options = {
            apiEndPoint: !isUndefined(options.apiEndPoint) ? options.apiEndPoint : 'assets/mock-data/',
            tokenName: !isUndefined(options.tokenName) ? options.tokenName : 'AppToken',
            mockData: !isUndefined(options.mockData) ? options.mockData : true
        }
    }

    /**
     * Execute the corresponding callback on specific response error code
     *
     * @param err
     */
    protected errorHooks(err: Response){
        for (let itm of this.errCallbacks) {
            if(err.status == itm.code ){ itm.callback.apply(this,err); break; }
        }
    }

    /**
     * Build a valid URL concatenating the url parameter with the ApiEndPoint
     *
     * @param url
     * @returns {string}
     */
    protected buildUrl ( url:string ): string{
        let nUrl = `${this.options.apiEndPoint.replace(/\/$/, "")}/${url.replace(/^\//g, '')}`;
        let match = nUrl.match(/\.([0-9a-z]+)(?:[\?#]|$)/i);

        if( this.options.mockData && match == null ){
            nUrl = `${nUrl}.json`;
        }

        return nUrl;
    }

    /**
     * Save the API Token cookie
     *
     * @param token
     */
    protected setToken ( token: string ): void{
        this.cookies.set(this.options.tokenName, token);
    }

    /**
     * Get the API Token from cookies
     *
     * @returns {string}
     */
    public getToken (): string{
        let token = this.cookies.get(this.options.tokenName);
        return !token || typeof token === 'undefined' ? '': token;
    }

    /**
     * Save the Extra Data cookie
     *
     * @param token
     */
    protected setExtraData ( data ): void{
        this.cookies.set( `${this.options.tokenName}-extra-data`, data);
    }

    /**
     * Get the Extra Data from cookies
     *
     * @returns {string}
     */
    public getExtraData (): {}{
        let data = this.cookies.get(`${this.options.tokenName}-extra-data`);
        return !data || typeof data === 'undefined' ? {}: data;
    }

    /**
     * Execute the corresponding callback on specific response error code
     *
     * @param err
     */
    public addError(code: number, callback: IErrorCallback){
        this.errCallbacks.push( { code: code, callback: callback } );
    }

    /**
     * Return the request options to be use on the next request. Once executed,
     * this method reset the request mode to his default values
     *
     * @returns {{headers: Headers, isSecured: boolean, fileName: string}}
     */
    protected buildRequestSettings() {
        let settings = {
            headers: new Headers(this.baseHeader),
            isSecured: this.secureRequest,
            fileName: this.downloadFileName
        };

        this.secureRequest = false;
        this.downloadFileName = null;

        return settings;
    }

    /**
     * Create a FormData object to be send as request payload data
     *
     * @param object
     * @param form
     * @param namespace
     * @returns {FormData}
     */
    protected createFormData(object: Object, form?: FormData, namespace?: string): FormData {
        const formData = form || new FormData();
        for (let property in object) {
            if (!object.hasOwnProperty(property) || !object[property]) {
                continue;
            }
            const formKey = namespace ? `${namespace}[${property}]` : property;
            if (object[property] instanceof Date) {
                formData.append(formKey, object[property].toISOString());
            } else if (typeof object[property] === 'object' && !(object[property] instanceof File)) {
                this.createFormData(object[property], formData, formKey);
            } else {
                formData.append(formKey, object[property]);
            }
        }
        return formData;
    }

    /**
     * Execute an API Request and return an Observable object
     *
     * @param url
     * @param method
     * @param data
     * @returns {Observable<R>}
     */
    protected request(method: string, url: string, data = {}): Observable<any>{
        let Settings = this.buildRequestSettings(),
            payload = null,
            options = new RequestOptions({ method: this.options.mockData ? 'get' : method, headers: Settings.headers });

        if( Settings.isSecured ) {
            let token = this.getToken();
            if ( !token ) { console.warn('Executing a secure request without TOKEN. Authorization header will not be set!'); }
            else { options.headers.append('Authorization', `Bearer ${token}`); }
        }

        if( method.toLowerCase() === 'get' ){
            for (let key in data) { if (data.hasOwnProperty(key)) options.params.set(key, data[key]); }
        }else{
            payload = this.createFormData( data );
            this.uploads.forEach((files)=>{
                if(files.length>0){
                    for( let i = 0; i < files.length; i++ ){
                        payload.append("file[]", files.item(i));
                    }
                }
            });
            options.body = payload;
            this.uploads = [];
        }

        options.responseType = Settings.fileName ? ResponseContentType.Blob : ResponseContentType.Text;

        let delay = Math.floor((Math.random() * 2000) + 1000);
        return this.http.request( this.buildUrl(url), options )
            .takeUntil(this.stopRequests$)
            .delay( this.options.mockData ? delay : 0 )
            .map(( res: Response ) => {
                if( Settings.fileName ) {
                    let contentType = res.headers.get('content-type')[0];
                    let blob = new Blob([res.blob()],{ type: contentType });
                } else {
                    return res.json() || {  };
                }
            })
            .catch((err: Response) => {
                this.errorHooks(err);
                return Observable.throw( Object.assign({}, err) );
            });
    }

    /**
     * Stop all pending requests
     */
    public stopAllRequests(){
        this.stopRequests$.next(true);
    }

    /**
     * Download Mode force the next request response body to be treated
     * as a file.
     *
     * The file type will be defined by the response "content-type" header entry
     *
     * @returns {ApiClientService}
     */
    public download( fileName: string ) {
        this.downloadFileName = fileName;
        return this;
    }

    /**
     * Set the request mode to SECURED for the next request.
     *
     * Secured Mode force the next request to include the authentication token.
     * The token must be requested previously using the "authorize" method.
     *
     * @returns {ApiClientService}
     */
    public secured() {
        this.secureRequest = true;
        return this;
    }

    /**
     * Set the request mode to PUBLIC for the next request.
     *
     * Public is the default request mode and ensure that no authentication token
     * will be pass on the next request.
     *
     * @returns {ApiClientService}
     */
    public public() {
        this.secureRequest = false;
        return this;
    }

    /**
     *
     * @param username
     * @param password
     * @returns {Observable<R>}
     */
    public authorize ( username: string, password: string ): Observable<any>{
        return this.request('post', 'authorize', { username: username, password: password })
            .do((data)=>{
                this.setToken(data.token);
                this.setExtraData(data.data ? data.data : {});
            });
    }

    /**
     * Remove the Authentication token cookie
     */
    public revoke (): void{
        this.cookies.deleteAll();
    }

    /**
     * Validate the Authentication token against the API
     *
     * @returns {Observable<R>}
     */
    public validateToken (): Observable<any>{
        return this.request('post', 'validate-token');
    }

    /**
     * Check if the client is already Authenticate
     *
     * @returns {boolean}
     */
    public isAuthorized (): boolean{
        return this.getToken() != '';
    }

    /**
     * API request using GET method
     *
     * @param url
     * @param data
     * @returns {Observable<any>}
     */
    public get(url: string, data?: {}): Observable<any>{
        return this.request('get', url, data);
    }

    /**
     * API request using POST method
     *
     * @param url
     * @param data
     * @returns {Observable<any>}
     */
    public post(url: string, data?: {}): Observable<any>{
        return this.request('post', url, data);
    }

    /**
     * API request using PUT method
     *
     * @param url
     * @param data
     * @returns {Observable<any>}
     */
    public put(url: string, data?: {}): Observable<any>{
        return this.request('put', url, data);
    }

    /**
     * API request using DELETE method
     *
     * @param url
     * @param data
     * @returns {Observable<any>}
     */
    public delete(url: string, data?: {}): Observable<any>{
        return this.request('delete', url, data);
    }

}
