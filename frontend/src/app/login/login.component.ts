import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CookieService} from "ngx-cookie-service";
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from '../app.config.module'
import {HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
import {AuthenticationService} from "../_services/authentication.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    error = '';
    cookieValue = 'UNKNOWN';

    /**
     * Login Form Group reference
     *
     * @type {boolean}
     */
    public FormGroup: FormGroup;

    constructor(public http: HttpClient,
                private router: Router,
                public FormBuilder: FormBuilder,
                private authenticationService: AuthenticationService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.FormGroup = this.FormBuilder.group({
            username: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            password: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(6)
                ])
            ],
        });
    }

    login() {
        //this.loading = true;
        //this.authenticationService.login(this.model.username, this.model.password)
        const params = {
            email: 'admin@admin.com',
            password: 'Rj1m3n3z'
        };
        this.authenticationService.login(params)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/dashboard']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            });
    }

    /*login() {
        let url = `${this.config.apiEndPoint}`;
        let data = this.FormGroup.value;
        const params = {
            email: 'admin@admin.com',
            password: 'Rj1m3n3z'
        };
        let headers = new HttpHeaders();
        headers.set('Accept','application/json');
        headers.set('Content-Type','application/json');
        headers.set('Cache-control','no-cache');

        this.http.post(url + 'authorize', params, {headers: headers})
            .subscribe(data => {
                    this.cookieService.set('token', data['token']);
                    let test = this.cookieService.get('token');
                    console.log("Cookie " + test);
                    this.router.navigate(['/dashboard']);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }*/
}
