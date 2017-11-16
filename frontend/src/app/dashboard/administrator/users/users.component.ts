import {Component, OnInit, Inject} from '@angular/core';
import {APP_CONFIG, AppConfig} from './../../../app.config.module'
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    private data: [Object];
    private pages: Array<number> = [];
    /*
    * DATA PAGINATE
    * */
    private prev_page_url: string;
    private last_page: number;
    private current_page: string;
    private next_page_url: string;
    private count: number;
    private i: number;

    private id: string;
    private name: string;
    private email: string;
    private url = `${this.config.apiEndPoint}`;

    public index_user: boolean = false;
    public new_user: boolean = false;
    public edit_user: boolean = false;

    public FormGroup: FormGroup;


    constructor(private router: Router,
                private http: Http,
                public FormBuilder: FormBuilder,
                private cookieService: CookieService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.FormGroup = this.FormBuilder.group({
            nombre: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            email: [null,
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
        this.getUsers(1);
    }

    private getUsers(page) {
        this.index_user = true;
        this.new_user = false;
        this.edit_user = false;
        this.data = null;
        this.http.get(this.url + 'user?page=' + page)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json.data;
                    this.prev_page_url = json.prev_page_url;
                    this.last_page = json.last_page;
                    this.current_page = json.current_page;
                    this.next_page_url = json.next_page_url;
                    this.count = 1;
                    this.pages = [];
                    for (this.i = this.count; this.i<=this.last_page; this.i++ ){
                        this.pages.push(this.i);
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    new(){
        this.index_user = false;
        this.new_user = true;
        this.edit_user = false;
    }

    saveUser(){
        let form = this.FormGroup.value;
        this.http.post(this.url + 'user', form)
            .subscribe(data => {
                    let json = data.json();
                    this.FormGroup.reset();
                    alert('El usuario se agrego correctamente');
                },
                (err) => {
                    if (err.error instanceof Error) {
                        // A client-side or network error occurred. Handle it accordingly.
                        console.log('An error occurred:', err.error.message);
                    } else {
                        // The backend returned an unsuccessful response code.
                        // The response body may contain clues as to what went wrong,

                        if(err.status == 422) {
                            let error = JSON.parse(err._body);
                            let errorMsj = "";
                            for(var key in error){
                                errorMsj += error[key] + '\n';
                                console.log(key + " " + error[key]);
                            }
                            alert(errorMsj);
                        }else{
                            alert(err);
                        }

                        /*this.formUnlock();
                        this.loading = false;

                        let router = this.router;
                        sweetalert({
                            title: error.message,
                            type: "error",
                            showCancelButton: false,
                            progressSteps: [],
                            confirmButtonText: "OK"
                        }).then(function () {
                            router.navigate(['/']);
                        });*/

                        console.log(err);
                        console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                    }
                }
            );
    }

    edit(row){
        this.index_user = false;
        this.new_user = false;
        this.edit_user = true;
        this.id = row.id;
        this.name = row.name;
        this.email = row.email;
    }

    updateUser(id){
        let form = this.FormGroup.value;
        this.http.put(this.url + 'user/' + id, form)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json;
                    this.FormGroup.reset();
                    alert('El usuario se edito correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    delete(id){
        this.http.delete(this.url + 'user/' + id)
            .subscribe(data => {
                    let json = data.json();
                    alert('El usuario se borro correctamente');
                    this.getUsers(1);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    back(){
        this.FormGroup.reset();
        this.index_user = true;
        this.new_user = false;
        this.edit_user = false;
        this.getUsers(1);
    }

}
