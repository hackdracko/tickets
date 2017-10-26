import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {HttpErrorResponse} from "@angular/common/http";
import {CookieService} from "ngx-cookie-service";
import {Router} from '@angular/router';
import {APP_CONFIG, AppConfig} from './../app.config.module'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    cookieValue = 'UNKNOWN';

    /**
     * Login Form Group reference
     *
     * @type {boolean}
     */
    public FormGroup: FormGroup;

    constructor(private router: Router,
                private http: Http,
                public FormBuilder: FormBuilder,
                private cookieService: CookieService,
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
        let url = `${this.config.apiEndPoint}`;
        //let nUrl = `${this.options.apiEndPoint.replace(/\/$/, "")}/${url.replace(/^\//g, '')}`;
        let data = this.FormGroup.value;
        const body = {
            email: 'admin@admin.com',
            password: 'Rj1m3n3z'
        };
        /*let headers = {
            'accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
        };*/
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Cache-Control', 'no-cache');
        headers.append('Pragma', 'no-cache');
        headers.append('Authorization', 'Bearer sadsad');

        this.http.post(url + 'authorize', body, headers)
            .subscribe(data => {
                    let json = data.json();
                    this.cookieService.set('token', json.token);
                    this.router.navigate(['/dashboard']);
                    //let test = this.cookieService.get('token');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }
}
