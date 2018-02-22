
import {Injectable, Inject} from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import {APP_CONFIG, AppConfig} from "../app.config.module";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {
    public token: string;
    public url: string;
    private headers: HttpHeaders;

    constructor(private http: HttpClient,
                private cookieService: CookieService,
                private router: Router,
                @Inject(APP_CONFIG) private config: AppConfig) {
        // set token if saved in local storage
        this.url = `${this.config.apiEndPoint}`;
        this.headers = new HttpHeaders();
        this.headers.set('Accept','application/json');
        this.headers.set('Content-Type','application/json');
        this.headers.set('Cache-control','no-cache');

    }

    login(params: any): Observable<boolean> {
        return this.http.post(this.url + 'authorize', params, {headers: this.headers})
            .map(result => {
                // login successful if there's a jwt token in the response
                let token = result && result['token'];
                if (token) {
                    // set token property
                    this.cookieService.set( 'token', token );
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        console.log("logout");
        this.cookieService.deleteAll();
        this.router.navigate(['/login']);
    }
}