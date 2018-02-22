import {Component, OnInit, Inject, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {APP_CONFIG, AppConfig} from "../../app.config.module";
import {TicketsService} from "./tickets.service";
import {MatTableDataSource, MatPaginator, MatSort} from "@angular/material";
import {Observable} from 'rxjs/Observable';
import {merge} from 'rxjs/observable/merge';
import {of as observableOf} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators/catchError';
import {map} from 'rxjs/operators/map';
import {startWith} from 'rxjs/operators/startWith';
import {switchMap} from 'rxjs/operators/switchMap';
import {HttpErrorResponse} from "@angular/common/http";

@Component({
    selector: 'app-tickets',
    templateUrl: './tickets.component.html',
    styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
    displayedColumns = ['position', 'ticket', 'cliente', 'sucursal', 'asignado', 'problema', 'estatus', 'prioridad', 'creado', 'cerrado', 'actions'];
    dataSource = new MatTableDataSource();
    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
    resultsLength = 0;
    perPage = 0;
    isLoadingResults = true;
    isRateLimitReached = false;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    private headers: any;
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
                private service: TicketsService,
                public FormBuilder: FormBuilder,
                @Inject(APP_CONFIG) private config: AppConfig) {
    }

    ngOnInit() {
        console.log("-----");
        console.log(this.paginator);

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
        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;
                    this.isLoadingResults = true;
                    return this.service.getIndex(this.url + 'ticket?page=' + (this.paginator.pageIndex + 1));
                    /*return this.exampleDatabase!.getRepoIssues(
                        this.sort.active, this.sort.direction, this.paginator.pageIndex);*/
                }),
                map(data => {
                    console.log(data);
                    // Flip flag to show that loading has finished.
                    this.isLoadingResults = false;
                    this.isRateLimitReached = false;
                    this.resultsLength = data['total'];
                    this.perPage = data['per_page'];
                    return data['data'];
                }),
                catchError(() => {
                    this.isLoadingResults = false;
                    // Catch if the GitHub API has reached its rate limit. Return empty data.
                    this.isRateLimitReached = true;
                    return observableOf([]);
                })
            ).subscribe(data => this.dataSource['data'] = data);
    }

    edit(id){
        console.log("agregar " + id);
    }

    /*private getTickets(page) {
        this.index_ticket = true;
        this.new_ticket = false;
        this.edit_ticket = false;
        this.data = null;
        this.service.getIndex(this.url + 'ticket?page=' + page)
            .subscribe(data => {
                    this.dataSource.data = data['data'];
                    this.resultsLength = data['total'];
                    this.data = data['data'];
                    this.prev_page_url = data['prev_page_url'];
                    this.last_page = data['last_page'];
                    this.current_page = data['current_page'];
                    this.next_page_url = data['next_page_url'];
                    this.count = 1;
                    this.pages = [];
                    for (this.i = this.count; this.i <= this.last_page; this.i++) {
                        this.pages.push(this.i);
                    }
                },
                (err: HttpErrorResponse) => {
                    console.log(err.status);
                    alert(err.statusText);
            });
    }*/

    /*private getClients() {
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

                        this.formUnlock();
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
                         });

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
    }*/

}
//{current_page: 1, data: Array(2), from: 1, last_page: 3, next_page_url: "http://tickets.local/api/ticket?page=2", …}current_page: 1data: (2) [{…}, {…}]0: {id: 1, office_id: 1, user_id: 1, titulo: "TITULO", problema: "PROBLEMA", …}1: {id: 2, office_id: 4, user_id: 2, titulo: "SUBIDA DE EXCEL", problema: "EL USUARIO MANDO DATOS", …}length: 2__proto__: Array(0)from: 1last_page: 3next_page_url: "http://tickets.local/api/ticket?page=2"path: "http://tickets.local/api/ticket"per_page: 2prev_page_url: nullto: 2total: 5__proto__: Object
export interface TestApi {
    items: TestApiData[];
    total_count: number;
}

export interface TestApiData {
    id: number;
    close_at: string;
    created_at: string;
    estatus: string;
    prioridad: number;
    problema: string;
    solucion: string;
    titulo: string;
    office: Office;
}
export interface Office {
    id: number;
    nombre: string;
}