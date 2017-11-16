import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {CookieService} from "ngx-cookie-service";
import {APP_CONFIG, AppConfig} from "../../../app.config.module";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-offices',
    templateUrl: './offices.component.html',
    styleUrls: ['./offices.component.css']
})
export class OfficesComponent implements OnInit {

    private data: [Object];
    private dataClients: [Object];
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
    private clientId: string;
    private nombre: string;
    private url = `${this.config.apiEndPoint}`;

    public index_office: boolean = false;
    public new_office: boolean = false;
    public edit_office: boolean = false;

    public FormGroup: FormGroup;

    constructor(private router: Router,
                private http: Http,
                public FormBuilder: FormBuilder,
                private cookieService: CookieService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.FormGroup = this.FormBuilder.group({
            client_id: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            nombre: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
        });
        this.getOffices(1);
        this.getClients();
    }

    private getOffices(page) {
        this.index_office = true;
        this.new_office = false;
        this.edit_office = false;
        this.data = null;
        this.http.get(this.url + 'office?page=' + page)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json.data;
                    this.prev_page_url = json.prev_page_url;
                    this.last_page = json.last_page;
                    this.current_page = json.current_page;
                    this.next_page_url = json.next_page_url;
                    this.count = 1;
                    this.pages = [];
                    for (this.i = this.count; this.i <= this.last_page; this.i++) {
                        this.pages.push(this.i);
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    private getClients() {
        this.http.get(this.url + 'ticket/clients')
            .subscribe(data => {
                    let json = data.json();
                    this.dataClients = json;
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    new() {
        this.index_office = false;
        this.new_office = true;
        this.edit_office = false;
    }

    saveOffice() {
        let form = this.FormGroup.value;
        this.http.post(this.url + 'office', form)
            .subscribe(data => {
                    let json = data.json();
                    this.FormGroup.reset();
                    alert('La sucursal se agrego correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    edit(row) {
        this.index_office = false;
        this.new_office = false;
        this.edit_office = true;

        this.id = row.id;
        this.clientId = row.client_id;
        this.nombre = row.nombre;

    }

    updateClient(id) {
        let form = this.FormGroup.value;
        this.http.put(this.url + 'office/' + id, form)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json;
                    this.FormGroup.reset();
                    alert('La sucursal se edito correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    delete(id) {
        this.http.delete(this.url + 'office/' + id)
            .subscribe(data => {
                    let json = data.json();
                    alert('La sucursal se borro correctamente');
                    this.getOffices(1);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    back() {
        this.FormGroup.reset();
        this.index_office = true;
        this.new_office = false;
        this.edit_office = false;
        this.getOffices(1);
    }

}
