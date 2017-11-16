import {Component, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Http} from "@angular/http";
import {CookieService} from "ngx-cookie-service";
import {APP_CONFIG, AppConfig} from "../../app.config.module";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

    private data: [Object];
    private dataClients: [Object];
    private dataOffices: [Object];
    private dataUsers: [Object];
    private prioridades: any[] = [
        {id: 1, name: 'Baja'},
        {id: 2, name: 'Media'},
        {id: 3, name: 'Alta'}
    ];
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
    private officeId: string;
    private userId: string;
    private titulo: string;
    private problema: string;
    private solucion: string;
    private prioridadId: string;
    private estatus: string;
    private creado: string;
    private url = `${this.config.apiEndPoint}`;

    public index_ticket: boolean = false;
    public new_ticket: boolean = false;
    public edit_ticket: boolean = false;

    public FormGroup: FormGroup;

    constructor(private router: Router,
                private http: Http,
                public FormBuilder: FormBuilder,
                private cookieService: CookieService,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        this.FormGroup = this.FormBuilder.group({
            user_id: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            client_id: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            office_id: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            titulo: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            problema: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            solucion: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
            prioridad: [null,
                Validators.compose([
                    Validators.required, Validators.minLength(4)
                ])
            ],
        });
        this.getTickets(1);
    }

    private getTickets(page) {
        this.index_ticket = true;
        this.new_ticket = false;
        this.edit_ticket = false;
        this.data = null;
        this.http.get(this.url + 'ticket?page=' + page)
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

    private getOffices(client_id) {

        let client = (client_id ? client_id : this.FormGroup.get("client_id").value);//this.FormGroup.get("client_id").value;
        console.log(client);
        this.http.get(this.url + 'ticket/offices/' + client)
            .subscribe(data => {
                    let json = data.json();
                    this.dataOffices = json;
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    private getUsers() {
        this.http.get(this.url + 'ticket/users')
            .subscribe(data => {
                    let json = data.json();
                    this.dataUsers = json;
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    new() {
        this.index_ticket = false;
        this.new_ticket = true;
        this.edit_ticket = false;
        this.getClients();
        this.getUsers();
    }

    saveClient() {
        let form = this.FormGroup.value;
        console.log(form);
        this.http.post(this.url + 'ticket', form)
            .subscribe(data => {
                    let json = data.json();
                    this.FormGroup.reset();
                    alert('El ticket se agrego correctamente');
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    edit(row) {
        this.index_ticket = false;
        this.new_ticket = false;
        this.edit_ticket = true;

        this.id = row.id;
        this.clientId = row.office.client_id;
        this.officeId = row.office_id;
        this.userId = row.user_id;
        this.titulo = row.titulo;
        this.problema = row.problema;
        this.solucion = row.solucion;
        this.prioridadId = row.prioridad;
        this.estatus = row.estatus;
        this.creado = row.created_at;
        this.getClients();
        this.getOffices(this.clientId);
        this.getUsers();

    }

    updateClient(id) {
        let form = this.FormGroup.value;
        console.log(form);
        this.http.put(this.url + 'ticket/' + id, form)
            .subscribe(data => {
                    let json = data.json();
                    this.data = json;
                    this.FormGroup.reset();
                    alert('El ticket se edito correctamente');
                    this.getTickets(1);
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

    delete(id) {
        this.http.delete(this.url + 'ticket/' + id)
            .subscribe(data => {
                    let json = data.json();
                    alert('El ticket se borro correctamente');
                    this.getTickets(1);
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
                }
            );
    }

    back() {
        this.FormGroup.reset();
        this.index_ticket = true;
        this.new_ticket = false;
        this.edit_ticket = false;
        this.getTickets(1);
    }

}
